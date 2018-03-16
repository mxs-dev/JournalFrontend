import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-routing-animation',
  template: `
      <div [hidden]="isHidden" class="csscssload-load-frame">
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
          <div class="cssload-dot"></div>
    </div>
  `,
  styles: ['']
})
export class RoutingAnimationComponent {
  public isHidden  = true;

  public constructor (
    public router: Router,
  ) {
    this.router.events
      .subscribe( (event) => {

        if (event instanceof NavigationStart) {
          this.isHidden = false;
        }

        if (event instanceof NavigationEnd) {
          this.isHidden = true;
        }

      });
  }
}
