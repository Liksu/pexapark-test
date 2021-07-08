import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PagesModule} from "./pages/pages.module";
import {RoutingModule} from "./routing.module";
import {CommonsModule} from "./commons/commons.module";
import {MobxAngularModule} from "mobx-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JsonInterceptor} from "./services/json-interceptor.service";
import {HighchartsChartModule} from 'highcharts-angular';
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MobxAngularModule,
        HighchartsChartModule,
        MatNativeDateModule,
        PagesModule,
        CommonsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RoutingModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
