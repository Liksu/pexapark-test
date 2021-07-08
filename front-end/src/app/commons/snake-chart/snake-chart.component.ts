import {Component, Input, OnInit} from '@angular/core';
import {FarmData} from "../../services/farms.interfaces";
import * as Highcharts from 'highcharts';
import more from 'highcharts/highcharts-more';

more(Highcharts);

@Component({
    selector: 'app-snake-chart',
    templateUrl: './snake-chart.component.html',
    styleUrls: ['./snake-chart.component.scss']
})
export class SnakeChartComponent implements OnInit {
    @Input() public data: FarmData
    Highcharts = Highcharts

    get chartOptions(): Highcharts.Options {
        return {
            chart: {
                height: 50,
                // width: 64,
                // margin: [8, 8, 8, 8],
                events: {
                    render: function() {
                        setTimeout(() => this.reflow(), 1)
                    }
                }
            },
            colors: [
                "#a2c4ec",
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
                labels: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                tickWidth: 0,
                startOnTick: false,
                endOnTick: false,
                tickPositions: []
            },
            yAxis: {
                title: {
                    text: ''
                },
                startOnTick: false,
                endOnTick: false,
                tickAmount: 0,
                opposite: false,
                showLastLabel: true,
                labels: {
                    enabled: false
                },
                tickPositions: [0]
            },
            plotOptions: {
                arearange: {
                    borderWidth: 0
                },
                series: {
                    animation: false,
                    lineWidth: 1,
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    marker: {
                        radius: 1,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    },
                }
            },
            tooltip: {
                enabled: false
            },
            series: this.getSeries(this.data)
        };
    }

    private getSeries(list: FarmData): Array<Highcharts.SeriesOptionsType> {
        const line = {type: 'line', data: []} as Highcharts.SeriesLineOptions
        const area = {type: 'arearange', data: []} as Highcharts.SeriesArearangeOptions

        const rangeIndexes = [-2, -1, 0, 1, 2]

        for (let i = 2; i < list.length; i += 5) {
            const range = rangeIndexes
                .map(n => list[i + n])
                .filter(item => item)
                .sort((a, b) => a.value - b.value)

            const lastIndex = range.length - 1
            const middleIndex = Math.floor(lastIndex / 2)

            line.data.push({x: list[i].timemark, y: range[middleIndex].value})
            area.data.push({x: list[i].timemark, high: range[lastIndex].value, low: range[0].value})
        }

        return [area, line]
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
