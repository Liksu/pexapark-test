#!/usr/bin/env perl
use 5.10.1;
use FindBin;
use lib "$FindBin::Bin/../../../cgi-bin";
use DBH;
use POSIX qw(mktime);
srand();

my $dbh = DBH->get();

$dbh->do('TRUNCATE TABLE tmp_pexapark_farms');
$dbh->do('TRUNCATE TABLE tmp_pexapark_data');

my $farm_sql = 'INSERT IGNORE INTO tmp_pexapark_farms SET farm_id = ?, capacity = ?';
my $data_sql = 'INSERT IGNORE INTO tmp_pexapark_data SET farm_id = ?, timemark = FROM_UNIXTIME(?), value = ?';

my $start = mktime(0, 0, 0, 1, 0, 120);
my $limit = time();

my $bar_max = 50;

for my $farm_id (1..12) {
    my $capacity = 7 + int rand() * 5;
    say "Farm $farm_id, capacity = $capacity";
    $dbh->do($farm_sql, undef, $farm_id, $capacity);

    my $date = $start;
    print '[' . (' ' x 50) . ']';

    my $value = rand() * $capacity;
    while ($date < $limit) {
        $dbh->do($data_sql, undef, $farm_id, $date, $value);

        $date += 3600;

        my $sign = rand() - 0.5 > 0 ? 1 : -1;
        $value += rand() * ($capacity / 3) * $sign;
        $value = 0 if $value < 0;
        $value = $capacity if $value > $capacity;

        my $bar_length = (($date - $start) / ($limit - $start)) * $bar_max;
        print "\r[" . ('#' x $bar_length) . (' ' x ($bar_max - $bar_length + 1)) .  ']';
    }

    print "\n";
}
