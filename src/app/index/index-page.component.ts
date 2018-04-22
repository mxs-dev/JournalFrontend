import { Component } from '@angular/core';

import { OverlayTestComponent  } from '../_shared/overlay/overlay-test.component';
import { OverlayService } from '../_shared/services';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-index',
  templateUrl: 'index-page.component.html',
})
export class IndexPageComponent {

  public constructor (
    private overlayService: OverlayService,
  ) {}


  public openOverlay() {
    this.overlayService.openInPopup(OverlayTestComponent, {a: 1});
  }
} 
