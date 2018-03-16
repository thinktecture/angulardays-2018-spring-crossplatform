import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {BlurService} from '../../services/blur.service';

@Component({
    selector: 'app-root',
    templateUrl: 'root.component.html',
})
export class RootComponent implements OnInit, OnDestroy {
    private _blurChangeSubscription: Subscription;

    public isBlurActive = false;

    constructor(private _blurService: BlurService) {
    }

    public ngOnInit(): void {
        this._blurService.onBlurChange.subscribe(blur => this.isBlurActive = blur);
    }

    public ngOnDestroy(): void {
        if (this._blurChangeSubscription) {
            this._blurChangeSubscription.unsubscribe();
        }
    }
}
