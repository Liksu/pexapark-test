#!/usr/bin/env perl
use 5.10.1;
use FindBin;
use lib "$FindBin::Bin/../../../cgi-bin";
use DBH;
use POSIX qw(mktime);
srand();

my $dbh = DBH->get();
my $data_sql = 'INSERT INTO tmp_pexapark_data SET farm_id = ?, timemark = FROM_UNIXTIME(?), value = ?';

my @date = (localtime)[0 .. 5];
@date[0, 1] = (0, 0);
my $date = mktime(@date);

my $farms = $dbh->selectall_arrayref('SELECT f.*, d.value FROM tmp_pexapark_farms as f left join (select farm_id, max(timemark), value from tmp_pexapark_data group by farm_id) as d on f.farm_id = d.farm_id where visible is not null', {Slice => {}});
for (@$farms) {
    my $value = $_->{value};
    my $sign = rand() - 0.5 > 0 ? 1 : -1;
    $value += rand() * ($_->{capacity} / 3) * $sign;
    $value = 0 if $value < 0;
    $value = $_->{capacity} if $value > $_->{capacity};

    $dbh->do($data_sql, undef, $_->{farm_id}, $date, $value);
}
