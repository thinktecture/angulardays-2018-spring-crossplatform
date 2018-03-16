import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {ShareService} from '../base/share.service';
import {WINDOW} from '../window.token';

@Injectable()
export class WebShareService extends ShareService {
    constructor(@Inject(WINDOW) private readonly _window: Window) {
        super();
    }

    public share(title: string, text: string, url: string): Observable<boolean> {
        return fromPromise(this._window.navigator.share({
            title: title,
            text: text,
            url: url
        }));
    }
}
