import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmComponent } from './farm/farm.component';
import {MatCardModule} from "@angular/material/card";
import { ChartComponent } from './chart/chart.component';
import { SnakeChartComponent } from './snake-chart/snake-chart.component';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HighchartsChartModule} from "highcharts-angular";
import {MobxAngularModule} from "mobx-angular";
import {RouterModule} from "@angular/router";
import { FarmPowerComponent } from './farm-power/farm-power.component';
import { FarmPluggerComponent } from './farm-plugger/farm-plugger.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";



@NgModule({
    declarations: [
        FarmComponent,
        ChartComponent,
        SnakeChartComponent,
        LoaderComponent,
        FarmPowerComponent,
        FarmPluggerComponent
    ],
    exports: [
        FarmComponent,
        FarmPowerComponent,
        FarmPluggerComponent,
        ChartComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatProgressSpinnerModule,
        HighchartsChartModule,
        MobxAngularModule,
        RouterModule,
        MatSlideToggleModule,
    ]
})
export class CommonsModule { }
