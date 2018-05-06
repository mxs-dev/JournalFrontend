import { Component } from '@angular/core';
import { UserService } from './_shared/services/user.service';

@Component({
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <app-overlay-host></app-overlay-host>`
})
export class AppComponent {}
