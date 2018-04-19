import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-routing-animation',
  templateUrl: 'routing-animation.component.html',
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
