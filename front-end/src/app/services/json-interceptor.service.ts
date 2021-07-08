import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {map} from "rxjs/operators";

interface ApiObject {
    [key: string]: string | Array<ApiObject>
}

@Injectable()
export class JsonInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            map(event => {
                if (event instanceof HttpResponse && /\/api\//.test(request.url)) {
                    event = event.clone({ body: this.restoreTypes(event.body) })
                }
                return event
            })
        )
    }

    private restoreTypes(body: ApiObject | Array<ApiObject>) {
        if (!body) return body

        if (body instanceof Array) {
            return this.restoreArrayOfObjectsTypes(body)
        }

        return Object.entries(body).reduce((accum, [key, value]) => ({...accum, [key]: this.restoreArrayOfObjectsTypes(value as Array<ApiObject>)}), {})
    }

    private restoreArrayOfObjectsTypes(body: Array<ApiObject>) {
        return body.map(item => {
            return Object.entries(item).reduce((accum, [key, value]) => ({...accum, [key]: isNaN(Number(value)) ? value : Number(value)}), {})
        })
    }
}
