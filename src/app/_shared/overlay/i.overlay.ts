import { Subject } from 'rxjs';


export interface IOverlay {
    onClose: Subject<any>;
}
