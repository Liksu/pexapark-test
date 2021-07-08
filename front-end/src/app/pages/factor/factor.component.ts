import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FarmsService} from "../../services/farms.service";
import {AggregatedCapacity, FarmData, FarmInfo} from "../../services/farms.interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-factor',
    templateUrl: './factor.component.html',
    styleUrls: ['./factor.component.scss']
})
export class FactorComponent implements OnInit {
    public farmId: number
    public from: Date
    public to: Date
    public farm: FarmInfo
    public minDate: Date
    public maxDate: Date
    public range: FormGroup
    public updating: boolean = false

    public totalFactor: number
    public aggregatedFactors: AggregatedCapacity
    public columns = ['date', 'factor', 'missedHours']

    constructor(
        private route: ActivatedRoute,
        public farms: FarmsService,
        private fb: FormBuilder
    ) {
        this.from = this.farms.fromDate(false) as Date
        this.to = new Date()
        this.farmId = +this.route.snapshot.paramMap.get('farmId')
        this.farm = this.farms.visible.find(farm => farm.farm_id === this.farmId)
        this.minDate = new Date(this.farm.frommark)
        this.maxDate = new Date(this.farm.tomark)

        this.reloadData()
    }

    ngOnInit(): void {
        this.range = this.fb.group({
            start: [this.from],
            end: [this.to]
        });

        this.range.controls.end.valueChanges.subscribe(value => {
            if (!value) return

            this.from = this.range.controls.start.value
            this.to = value
            this.reloadData()
        })
    }

    reloadData() {
        this.updating = true
        this.farms.getDataFor(this.farmId, this.from, this.to).subscribe((data: FarmData) => {
            this.updating = false
            const farmInfo = {
                ...this.farm,
                data
            }
            this.aggregatedFactors = this.farms.aggregateByDay(farmInfo, this.from, this.to)
            this.totalFactor = this.aggregatedFactors.reduce((sum, {factor}) => sum + factor, 0) / this.aggregatedFactors.length
        })
    }
}
