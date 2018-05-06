import { Type, ComponentRef } from '@angular/core';

import { Subject } from 'rxjs';



export interface IOverlay {
    options: IOverlayOptions;
    componentDestroyed: Subject<void>;
    insertComponent (componentType: Type<any>, data: any): ComponentRef<any>;
}


export interface IOverlayComponent {
    data: any;
    componentDestroyed: Subject<void>;
}


export interface IOverlayOptions {
    size: string;
    opacity ?: string;
    blur ?: string;
}
