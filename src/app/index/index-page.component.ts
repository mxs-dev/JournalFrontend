import { Component } from '@angular/core';


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
  }
} 
