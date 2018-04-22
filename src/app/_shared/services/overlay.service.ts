import { ComponentRef, ElementRef, Injectable, Type } from '@angular/core';

import { OverlayHostComponent } from '../overlay/overlay-host.component';


@Injectable()
export class OverlayService {

    private host: OverlayHostComponent;
    
    public registerHost (hostComponent: OverlayHostComponent) {
        this.host = hostComponent;
    }

    public openInPopup(componentType: Type<any>, data ?: any) {
        if (!this.host) {
            throw new Error('Host is not registered');
        }

        return this.host.openComponentInPopup(componentType, data);
    }
}
