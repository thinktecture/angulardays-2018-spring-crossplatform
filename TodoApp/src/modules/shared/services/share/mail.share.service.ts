import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ShareService} from '../base/share.service';
import {WINDOW} from '../window.token';

@Injectable()
export class MailShareService extends ShareService {
    constructor(@Inject(WINDOW) private readonly _window: Window) {
        super();
    }

    public share(title: string, text: string, url: string): Observable<boolean> {
        const body = url ? `${text}\r\n${url}` : text;
        this._window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;

        return of(true);
    }
}
