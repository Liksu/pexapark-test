import {Injectable} from '@angular/core';
import {FarmsService} from "./farms.service";
import {observable} from "mobx-angular";
import {ClusterData} from "./farms.interfaces";

@Injectable({
    providedIn: 'root'
})
export class LastMonthService {
    @observable clusterData: ClusterData = {}

    constructor(
        private farms: FarmsService
    ) {
    }

    // getLastMonthDataFor()

}
