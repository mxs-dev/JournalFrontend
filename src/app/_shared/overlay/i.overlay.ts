import { Subject } from 'rxjs/Rx';
export interface IOverlay{
    onClose :Subject<any>;
}