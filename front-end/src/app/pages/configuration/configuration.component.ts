import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FarmsService} from "../../services/farms.service";

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationComponent implements OnInit {

    constructor(
        public farms: FarmsService,
        private cdr: ChangeDetectorRef
    ) {
        farms.getAvailableFarms().subscribe(() => cdr.detectChanges())
    }

    ngOnInit(): void {
    }

}
