import {Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CameraService} from '../base/camera.service';
import {WINDOW} from '../window.token';
import {normalizeURL} from 'ionic-angular/util/util';

export class MobileCameraService extends CameraService {
    constructor(@Inject(WINDOW) private readonly _window: Window) {
        super();
    }

    public getPicture(): Observable<string> {
        return new Observable<string>(subscriber => {
            /*const removeDomListener = () => {
                document.removeEventListener('deviceready', onCordovaDeviceReady);
            };

            const onCordovaDeviceReady = () => {*/
                const camera = this._window.navigator.camera;

                const options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.PNG,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                camera.getPicture(imageData => {
                    // removeDomListener();
                    subscriber.next(normalizeURL(imageData));
                    subscriber.complete();
                }, error => {
                    // removeDomListener();
                    subscriber.error(error);
                }, options);
            /* };

             document.addEventListener('deviceready', onCordovaDeviceReady);*/
        });
    }
}
