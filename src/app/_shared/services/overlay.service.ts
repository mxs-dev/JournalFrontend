import { ComponentRef, ElementRef, Injectable, Type } from '@angular/core';

import { OverlayHostComponent } from '../overlay/overlay-host.component';


@Injectable()
export class OverlayService {

  private host: OverlayHostComponent;

  public registerHost(hostComponent: OverlayHostComponent) {
    this.host = hostComponent;

    this.host.overlayOpened
      .subscribe(() => {
        document.body.classList.add('modal-open');
      });

    this.host.overlayDestroyed
      .subscribe(() => {
        document.body.classList.remove('modal-open');
      });

  }

  public openInPopup(componentType: Type<any>, data?: any) {
    if (!this.host) {
      throw new Error('Host is not registered');
    }

    return this.host.openComponentInPopup(componentType, data);
  }
}
