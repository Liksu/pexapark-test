import {Component, Input} from '@angular/core';
import {AvailableFarm, FarmInfo} from "../../services/farms.interfaces";

@Component({
    selector: 'app-farm',
    templateUrl: './farm.component.html',
    styleUrls: ['./farm.component.scss']
})
export class FarmComponent {
    @Input() public farm: FarmInfo | AvailableFarm
}
