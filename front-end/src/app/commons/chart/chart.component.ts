import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {AggregatedCapacity} from "../../services/farms.interfaces";

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    @Input() public data: AggregatedCapacity
    Highcharts = Highcharts
    chartOptions: Highcharts.Options

    private getChartOptions(): Highcharts.Options {
        return {
            chart: {
                type: 'column'
            },
            colors: [
                "#2b7fe2",
                "#ff7f14",
            ],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            rangeSelector: {
                enabled: false
            },
            xAxis: {
                title: {
                    text: ''
                },
                labels: {
                    format: "{value:%b %e}"
                },
                type: 'datetime',
            },
            yAxis: {
                title: {
                    text: ''
                },
                startOnTick: false,
                endOnTick: false,
                showLastLabel: true,
            },
            plotOptions: {
                column: {
                },
            },
            series: [{
                type: 'column',
                name: 'Capacity Factor',
                data: this.data.map(item => ({x: item.date.valueOf(), y: item.factor}))
            }],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.2f}</b>'
            }
        };
    }



    ngOnInit(): void {
        this.chartOptions = this.getChartOptions()
    }

}
