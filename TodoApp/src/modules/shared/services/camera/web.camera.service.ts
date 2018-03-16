import {Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {CameraService} from '../base/camera.service';
import {WINDOW} from '../window.token';

export class WebCameraService extends CameraService {
    constructor(@Inject(WINDOW) private readonly _window: Window) {
        super();
    }

    private getMediaDevices(): any {
        const navigator = this._window.navigator;
        return ((navigator['mozGetUserMedia'] || navigator['webkitGetUserMedia']) ? {
            getUserMedia: function (options) {
                return new Promise((resolve, reject) => {
                    (navigator['mozGetUserMedia'] ||
                        navigator['webkitGetUserMedia']).call(navigator, options, resolve, reject);
                });
            }
        } : null) || navigator.mediaDevices;
    }

    public getPicture(): Observable<string> {
        return fromPromise(this.getMediaDevices().getUserMedia({ video: true, audio: false })
            .then((stream: any) => {
                return new Promise((resolve, reject) => {
                    try {
                        const vendorURL = this._window.URL || this._window['webkitURL'];
                        const doc = document;
                        const videoElement = doc.createElement('video');
                        videoElement.src = vendorURL.createObjectURL(stream);
                        videoElement.play();

                        videoElement.addEventListener('canplay', () => {
                            const canvasElement = doc.createElement('canvas');
                            canvasElement.setAttribute('width', videoElement.videoWidth.toString());
                            canvasElement.setAttribute('height', videoElement.videoHeight.toString());

                            // Wait a bit before taking a screenshot so the camera has time to adjust lights
                            this._window.setTimeout(() => {
                                const context = canvasElement.getContext('2d');
                                context.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);

                                const url = canvasElement.toDataURL('image/png');

                                videoElement.pause();

                                if (stream.stop) {
                                    stream.stop();
                                }

                                if (stream.getAudioTracks) {
                                    stream.getAudioTracks().forEach((track: any) => {
                                        track.stop();
                                    });
                                }

                                if (stream.getVideoTracks) {
                                    stream.getVideoTracks().forEach((track: any) => {
                                        track.stop();
                                    });
                                }

                                resolve(url);
                            }, 500);
                        });
                    } catch (e) {
                        reject(e);
                    }
                });
            }));
    }
}
