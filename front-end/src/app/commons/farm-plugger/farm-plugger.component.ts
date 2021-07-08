import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {FarmComponent} from "../farm/farm.component";
import {AvailableFarm} from "../../services/farms.interfaces";
import {FarmsService} from "../../services/farms.service";

@Component({
    selector: 'app-farm-plugger',
    templateUrl: './farm-plugger.component.html',
    styleUrls: ['./farm-plugger.component.scss']
})
export class FarmPluggerComponent extends FarmComponent {
    @Input() public farm: AvailableFarm = {} as AvailableFarm
    public updating: boolean = false

    constructor(
        private farms: FarmsService,
        private cdr: ChangeDetectorRef
    ) {
        super();
    }

    updatePlugging({checked}) {
        this.updating = true
        this.farms.toggleVisibility(this.farm.farm_id, checked)
            .subscribe(() => {
                console.log(`updated #${this.farm.farm_id} to ${checked}`)
                this.updating = false
                this.cdr.markForCheck()
            })
    }
}
