import {Observable} from 'rxjs/Observable';
import {PlatformService} from "./platform";
import {MobileCameraService} from "./mobileCamera";
import {DesktopCameraService} from "./desktopCamera";

export interface ICameraService {
    getPhoto(): Observable<string>;
}

export abstract class CameraService implements ICameraService {
    public abstract getPhoto(): Observable<string>;
}

export function cameraServiceFactory(platformService: PlatformService) : ICameraService {
  if(platformService.isMobileDevice) {
    return new MobileCameraService();
  }

  return new DesktopCameraService();
}
