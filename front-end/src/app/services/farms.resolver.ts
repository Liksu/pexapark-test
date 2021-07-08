import {Injectable} from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {FarmsService} from "./farms.service";
import {VisibleFarms} from "./farms.interfaces";

@Injectable({
    providedIn: 'root'
})
export class FarmsResolver implements Resolve<VisibleFarms> {
    constructor(
        private farms: FarmsService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<VisibleFarms> {
        if (this.farms.visible.length) return of(this.farms.visible)
        return this.farms.getUserFarms()
    }
}
