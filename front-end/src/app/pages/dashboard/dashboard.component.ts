import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FarmsService} from "../../services/farms.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    public factor: number = null;

    constructor(
        public farms: FarmsService,
        private cdr: ChangeDetectorRef
    ) {
        farms.getUserFarms().subscribe(() => {
            this.farms.getCluster().subscribe()
        })
        farms.updated$$.subscribe((type: string) => {
            if (type === 'cluster') this.updateFactor()
            cdr.detectChanges()
        })
    }

    private updateFactor() {
        const farmsFactor = this.farms.visible.reduce((sum, farm) => sum + this.farms.calculateFactor(farm), 0)
        this.factor = +(farmsFactor / this.farms.visible.length).toFixed(2)
    }
}
