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

import { OverlayComponent } from './overlay/overlay.component';
import { OverlayService } from '../services/overlay.service';

import { Subject } from 'rxjs';
import { IOverlayOptions, IOverlay, IOverlayComponent } from './i.overlay';


@Component({
  selector: `app-overlay-host`,
  template: `<ng-template #overlay_container></ng-template>`,
})
export class OverlayHostComponent implements OnInit, OnDestroy {

  @ViewChild('overlay_container', { read: ViewContainerRef }) private container: ViewContainerRef;

  public overlayOpened    = new Subject<void>();
  public overlayDestroyed = new Subject<void>();


  protected componentDestroyed = new Subject<void>();


  public constructor(
    private overlayService: OverlayService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  public ngOnInit () {
    this.overlayService.registerHost(this);
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();

    this.overlayOpened.unsubscribe();
    this.overlayDestroyed.unsubscribe();
  }


  public openComponentInPopup (componentType: Type<IOverlayComponent>, data?: any, options ?: IOverlayOptions): 
    { overlayComponentRef: ComponentRef<IOverlay>, popupComponentRef: ComponentRef<IOverlayComponent> } {
    
    const overlayComponentFactory = this.componentFactoryResolver.resolveComponentFactory(OverlayComponent);
    const overlayComponentRef: ComponentRef<IOverlay> = this.container.createComponent(overlayComponentFactory);

    overlayComponentRef.instance.componentDestroyed
      .takeUntil(this.componentDestroyed)
      .subscribe(() => { 
        overlayComponentRef.destroy(); 
        this.overlayDestroyed.next();
      });

    const popupComponentRef = overlayComponentRef.instance.insertComponent(componentType, data);
    
    this.overlayOpened.next();

    return { overlayComponentRef, popupComponentRef };
  }
}

