import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ConfigurationComponent} from "./pages/configuration/configuration.component";
import {FactorComponent} from "./pages/factor/factor.component";
import {FarmsResolver} from "./services/farms.resolver";

const routes: Routes = [
    {
        path: 'config',
        component: ConfigurationComponent
    },
    {
        path: 'farm/:farmId',
        component: FactorComponent,
        resolve: {
            visible: FarmsResolver
        }
    },
    {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
        resolve: {
            visible: FarmsResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
