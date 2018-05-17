import { Component } from '@angular/core';


@Component({
  selector: 'jounal-tpl',
  template:  `
    <div class="container mt-3 mb-3">
      <app-alert></app-alert>
      <router-outlet></router-outlet>
    </div>
  `
})
export class JournalLayoutComponent {}
