import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
    private _userId: string;

    constructor() {
        this._userId = localStorage.getItem('USER_ID') || `${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`;
        localStorage.setItem('USER_ID', this._userId);
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone({ setHeaders: { 'X-User-ID': this._userId } }));
    }
}
