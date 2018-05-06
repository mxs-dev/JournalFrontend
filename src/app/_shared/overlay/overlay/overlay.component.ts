import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, Type, ViewChild, ViewContainerRef } from '@angular/core';

import { IOverlay, IOverlayOptions } from '../i.overlay';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-overlay',
  templateUrl: 'overlay.component.html',
  styleUrls: ['overlay.component.scss']
})
export class OverlayComponent implements IOverlay {

  @ViewChild('container', { read: ViewContainerRef }) protected container: ViewContainerRef;

  public componentDestroyed = new Subject<void>();

  public options: IOverlayOptions = {
    size: 'col-6', 
    opacity: '0.8'
  };

  public constructor(
    protected componentFactoryResolver: ComponentFactoryResolver
  ) { }


  public insertComponent(componentType: Type<any>, data?: any, options ?: IOverlay) {
    const popupComponentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    const popupComponentRef: ComponentRef<any> = this.container.createComponent(popupComponentFactory);
    popupComponentRef.instance.componentDestroyed.subscribe(() => {
      this.componentDestroyed.next();
    });
    popupComponentRef.instance.data = data;

    this.applySize();

    return popupComponentRef;
  }

  
  public onCloseListener() {
    this.componentDestroyed.next(); 
    this.componentDestroyed.unsubscribe();
  }


  protected applySize () {
    let sizeClass = this.options.size;

    if (!this.options.size) {
      sizeClass = 'col-6';
    }

    document.querySelector('.overlay-container').classList.add(sizeClass);
  }
}
