import {Observable} from 'rxjs/Observable';

export abstract class CameraService {
    public abstract getPicture(): Observable<string>;
}
