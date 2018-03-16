import {environment} from '../../../../environments/environment';
import {BrowserFeatureKey} from '../../models/browserFeatureKey.model';
import {FeatureService} from '../feature.service';
import {WINDOW} from '../window.token';
import {CordovaShareService} from './cordova.share.service';
import {MailShareService} from './mail.share.service';
import {WebShareService} from './web.share.service';

export const ShareServiceFactory = (featureService: FeatureService, window: Window) => {
    const feature = featureService.detectFeature(BrowserFeatureKey.WebShareAPI);
    if (feature.supported) {
        return new WebShareService(window);
    }

    if (environment.mobile) {
        return new CordovaShareService(window);
    }

    return new MailShareService(window);
};

export const ShareServiceFactoryDeps = [FeatureService, WINDOW];
