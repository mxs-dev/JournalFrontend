import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  OnDestroy,
} from '@angular/core';

import { OverlayComponent } from './overlay.component';
import { OverlayService } from '../services/overlay.service';

import { Subject } from 'rxjs';


@Component({
  selector: `app-overlay-host`,
  template: `<ng-template #overlay_container></ng-template>`,
})
export class OverlayHostComponent implements OnInit, OnDestroy {

  @ViewChild('overlay_container', { read: ViewContainerRef }) private container: ViewContainerRef;

  protected componentDestroyed = new Subject<void>();

  public constructor(
    private overlayService: OverlayService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  ngOnInit () {
    this.overlayService.registerHost(this);
  }


  ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  openComponentInPopup(componentType: Type<any>, data?: any): { overlayComponentRef: ComponentRef<OverlayComponent>, popupComponentRef: ComponentRef<any> } {
   
    const overlayComponentFactory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);
    const overlayComponentRef: ComponentRef<OverlayComponent> = this.container.createComponent(overlayComponentFactory);

    overlayComponentRef.instance.onClose
    .takeUntil(this.componentDestroyed)
    .subscribe(() => {
      console.log('Close overlay');
      overlayComponentRef.destroy();
    });

    const popupComponentRef = overlayComponentRef.instance.insertComponent(componentType, data);

    return { overlayComponentRef, popupComponentRef };
  }

}

