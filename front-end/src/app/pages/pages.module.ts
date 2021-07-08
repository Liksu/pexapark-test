import {NgModule} from '@angular/core';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {MobxAngularModule} from "mobx-angular";
import {CommonModule} from "@angular/common";
import {CommonsModule} from "../commons/commons.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FactorComponent } from './factor/factor.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";


@NgModule({
    declarations: [
        DashboardComponent,
        ConfigurationComponent,
        FactorComponent,

    ],
    imports: [
        MobxAngularModule,
        CommonModule,
        CommonsModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatTableModule
    ]
})
export class PagesModule {
}
