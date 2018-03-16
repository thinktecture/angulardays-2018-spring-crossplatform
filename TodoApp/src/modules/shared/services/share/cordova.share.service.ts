import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {ShareService} from '../base/share.service';
import {WINDOW} from '../window.token';

@Injectable()
export class CordovaShareService extends ShareService {
    constructor(@Inject(WINDOW) private readonly _window: Window) {
        super();
    }

    public share(title: string, text: string, url: string): Observable<boolean> {
        const options = {
            message: text,
            subject: title,
            url
        };

        return new Observable<boolean>(subscribe => {
            window.plugins.socialsharing.shareWithOptions(options, result => {
                subscribe.next(!!result.completed);
                subscribe.complete();
            }, err => {
                subscribe.error(err);
            });
        });
    }
}
