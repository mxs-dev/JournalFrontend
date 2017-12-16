import { OverlayComponent } from './overlay.component';
import {
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    ElementRef,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

import { OverlayService } from './overlay.service';

@Component({
    selector: `overlay-host`,
    template: `
        <ng-template #overlay_container></ng-template>
    `,
    styles: [`
    `]
})
export class OverlayHostComponent implements OnInit{
    
    @ViewChild('overlay_container', {read: ViewContainerRef}) private container :ViewContainerRef;
    
    public constructor(
        private overlayService :OverlayService,
        private componentFactoryResolver :ComponentFactoryResolver 
    ){}

    ngOnInit(){       
       this.overlayService.registerHost(this); 
    }

    ngAfterViewInit(){
      
    }

    openComponentInPopup(componentType :Type<any>, data ?:any) :{ overlayComponentRef :ComponentRef<OverlayComponent>, popupComponentRef :ComponentRef<any>}{
        
        let overlayComponentFactory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);
       
        let overlayComponentRef :ComponentRef<OverlayComponent> = this.container.createComponent(overlayComponentFactory);
        overlayComponentRef.instance.onClose.subscribe( () => {
            console.log('Close');
            overlayComponentRef.destroy();
        });
        
        let popupComponentRef = overlayComponentRef.instance.insertComponent(componentType, data);

        return {overlayComponentRef, popupComponentRef};
    }

}