import { OverlayHostComponent } from './overlay-host.component';
import { ComponentRef, ElementRef, Injectable, Type } from '@angular/core';

@Injectable()
export class OverlayService{

    private host :OverlayHostComponent;
    
    public registerHost (hostComponent :OverlayHostComponent){
        this.host = hostComponent;
    }

    public openInPopup(componentType :Type<any>, data ?:any){
        if (!this.host) {
            throw new Error("Host is not registered");
        }

        return this.host.openComponentInPopup(componentType, data);
    }

}