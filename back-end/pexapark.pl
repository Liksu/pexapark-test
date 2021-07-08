#!/usr/bin/env perl
use Mojolicious::Lite;
use FindBin;
use lib "$FindBin::Bin/../../../cgi-bin";

use DBH;
my $dbh = DBH->get();

hook before_routes => sub {
    $dbh = DBH->get() unless $dbh && $dbh->ping;
};

get '/' => sub {
    my $c = shift;

    $c->reply->static('index.html');
};

get '/api/farms' => sub {
    my $c = shift;

    my $sql = 'SELECT farm_id, capacity, if(visible is null, 0, 1) as visible FROM tmp_pexapark_farms';

    if (defined $c->param('visible')) {
        $sql = <<"        SQL";
            SELECT d.*, capacity, v.value
            FROM tmp_pexapark_farms AS f
            LEFT JOIN (
                SELECT farm_id, MIN(timemark) as frommark, MAX(timemark) as tomark FROM tmp_pexapark_data GROUP BY farm_id
            ) AS d ON f.farm_id = d.farm_id
            JOIN (
                SELECT * FROM tmp_pexapark_data
            ) AS v ON v.farm_id = d.farm_id and v.timemark = d.tomark
            WHERE visible is not null
        SQL
    }

    my $farms = $dbh->selectall_arrayref($sql, {Slice => {}});

    $c->render(json => $farms);
};

get '/api/farms/batch' => sub {
    my $c = shift;

    my $farmsData = {};
    for (@{$c->every_param('farm_id')}) {
        $farmsData->{$_} = getFarmData($c, $_);
    }

    $c->render(json => $farmsData);
};

get '/api/farms/:farm_id' => sub {
    my $c = shift;
    $c->render(json => getFarmData($c, $c->param('farm_id')));
};

get '/*' => sub {
    shift->reply->static('index.html');
};

patch '/api/farms/:farm_id' => sub {
    my $c = shift;

    my $sql = q|UPDATE tmp_pexapark_farms SET visible = ? WHERE farm_id = ?|;
    $dbh->do($sql, undef, $c->req->json->{visible} ? '' : undef, $c->param('farm_id'));

    $c->render(json => {}, status => 204);
};

app->config(hypnotoad => {
    listen => ['http://*:4492'],
    workers => 1
});

sub getFarmData {
    my ($c, @params) = @_;
    my $sql = 'select UNIX_TIMESTAMP(timemark) as timemark, value from tmp_pexapark_data where farm_id = ?';

    if ($c->param('from')) {
        $sql .= ' and timemark >= ?';
        push @params, $c->param('from');
    }

    if ($c->param('to')) {
        $sql .= ' and timemark <= ?';
        push @params, $c->param('to');
    }

    return $dbh->selectall_arrayref($sql, {Slice => {}}, @params);
}

app->start;
