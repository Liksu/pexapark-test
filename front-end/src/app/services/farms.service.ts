import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {action, observable} from "mobx-angular";
import {AggregatedCapacity, AvailableFarms, ClusterData, FarmData, FarmInfo, VisibleFarms} from "./farms.interfaces";
import {Subject} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FarmsService {
    @observable public available: AvailableFarms = []
    @observable public visible: VisibleFarms = []
    @observable public cluster: ClusterData = {}
    @observable public selectedFarm: FarmData = []
    public updated$$ = new Subject<string>()

    private duration = 168 // 7 days

    constructor(
        private http: HttpClient
    ) {
    }

    @action getAvailableFarms() {
        return this.http.get('/api/farms')
            .pipe(map((farmsList: AvailableFarms) => {
                this.available = farmsList
                this.updated$$.next('available')
                return farmsList
            }))
    }

    @action getUserFarms() {
        return this.http.get('/api/farms', {params: {visible: true}})
            .pipe(
                map((farmsList: VisibleFarms) => {
                    this.visible = farmsList
                    this.updated$$.next('visible')
                    return farmsList
                })
            )
    }

    @action getCluster() {
        let params = this.visible.reduce((params, farm) => params.append('farm_id', farm.farm_id), new HttpParams())
        params = params.append('from', this.fromDate() as string)

        return this.http.get('/api/farms/batch', {params})
            .pipe(map((data: ClusterData) => {
                this.cluster = data
                this.visible = this.visible.map(farm => ({
                    ...farm,
                    data: data[farm.farm_id]
                }))
                this.updated$$.next('cluster')
                return data
            }))
    }

    @action toggleVisibility(farmId: number, visible: boolean) {
        return this.http.patch(`/api/farms/${farmId}`, {visible})
            .pipe(map(() => {
                const farm = this.available.find(farm => farm.farm_id === farmId)
                if (farm) farm.visible = Number(visible)
                return null
            }))
    }

    @action getDataFor(farmId: number, from?: Date, to: Date = new Date()) {
        if (!from) from = this.fromDate(false) as Date
        const params = {
            from: this.isoDate(from),
            to: this.isoDate(to) + 'T23:59:59'
        }
        return this.http.get(`/api/farms/${farmId}`, {params})
            .pipe(map((data: FarmData) => {
                this.selectedFarm = data
                this.updated$$.next('selectedFarm')
                return data
            }))
    }

    public calculateFactor(farm: FarmInfo, from?: Date | number, to?: Date) {
        let hours = this.duration

        if (from && !(from instanceof Date) && !to) {
            hours = from
        } else if (from) {
            if (!to) to = new Date();
            hours = Math.floor((to.valueOf() - from.valueOf()) / (1000 * 60 * 60))
        }

        const totalCapacity = farm.capacity * hours
        if (!totalCapacity) {
            console.warn(`Incorrect total capacity for farm capacity = ${farm.capacity} and hours = ${hours}`)
            return 0
        }

        const realCapacity = farm.data.reduce((sum, {value}) => sum + value, 0)
        return realCapacity / totalCapacity
    }

    public aggregateByDay(farm: FarmInfo, from: Date, to: Date): AggregatedCapacity {
        const store = {}

        farm.data.forEach(item => {
            const date = this.isoDate(new Date(item.timemark * 1000))
            if (!store[date]) store[date] = []
            store[date].push(item.value)
        })

        const factors: AggregatedCapacity = []

        const lastDate = new Date(this.isoDate(to) + 'T23:59:59')
        for (let date = new Date(this.isoDate(from)); date < lastDate; date.setDate(date.getDate() + 1)) {
            const isoDate = this.isoDate(date)
            const length = isoDate === this.isoDate(new Date()) ? new Date().getHours() + 1 : 24

            const dayInfo = {
                capacity: farm.capacity,
                data: Array.from({length}, (_, index) => ({value: store[isoDate]?.[index] ?? 0}))
            } as FarmInfo

            factors.push({
                date: new Date(date),
                factor: this.calculateFactor(dayInfo, length),
                missedHours: length - (store[isoDate]?.length ?? 0)
            })
        }

        return factors
    }

    public fromDate(getISO = true): Date | string {
        const date = new Date()
        date.setHours(date.getHours() - this.duration)
        return getISO ? this.isoDate(date) : date
    }

    private isoDate(date: Date): string {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(n => String(n).padStart(2, '0')).join('-')
    }
}
