# Pexapark Farms

Tiny farms monitor. Demo available [here](http://liksu.com:4492/).

## Back-end

Contains back-end created on Perl & Mojolicious. Database structure included. \
To run back-end you'll need to create a connector to MySQL database. In my code I use library DBH, that is out of scope for this project.
Then, you can run `data_generator.pl` to fill your DB with random data from the beginning of 2020.
Add `data_append.pl` to cron running every hour (`0 * * * * perl ./data_append.pl`), and your data will be updated.

The main back-end file is `pexapark.pl`. There you can find Mojolicious server that provide the api endpoints and serve static built anglar application, that should be placed in `public folder near the server.

## Front-end

Application based on Angular 12, Highcharts, Angular Material and MobX.

It contains only three pages: Dashboard, Factor page and Configuration page.

I prepared 12 farms for testing. You can find them all it on the configuration page.
On all other pages you'll see only 'powered on' farms.
It means, that farms are working right now and are available for monitoring.
For the 'powered off' farms data are not updating every hour, so you'll get an 'missed hours' in statistics. 

### Dashboard

On the main page you can find current Total Capacity Factor of your cluster (all powered on farms) in the last week.
Under it, you can find current power capacity of each farm and history chart for the last week with data aggregated with median filter with scale of 1:5.

The farm title navigates you to The Factor page.

### Factor

Here you can specify a data range to investigate any available working period of farm. Last week by default.

Then, you'll be able to see the total capacity factor for this period and two tabs: Chart and Table, that presents aggregated data.

### Configuration

Here you can find all available farms in the system and power them on or off.
