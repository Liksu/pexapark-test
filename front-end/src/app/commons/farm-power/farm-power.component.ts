import {Component, Input} from '@angular/core';
import {FarmInfo} from "../../services/farms.interfaces";

@Component({
    selector: 'app-farm-power',
    templateUrl: './farm-power.component.html',
    styleUrls: ['./farm-power.component.scss']
})
export class FarmPowerComponent {
    @Input() public farm: FarmInfo = {} as FarmInfo
}
