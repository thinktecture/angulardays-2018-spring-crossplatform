import {environment} from '../../../../environments/environment';
import {WINDOW} from '../window.token';
import {MobileCameraService} from './mobile.camera.service';
import {WebCameraService} from './web.camera.service';

export const CameraServiceFactory = (window: Window) => {
    return environment.mobile ? new MobileCameraService(window) : new WebCameraService(window);
};

export const CameraServiceFactoryDeps = [WINDOW];
