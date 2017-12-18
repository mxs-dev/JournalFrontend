import { Component, OnInit } from '@angular/core';
import { UserService, AuthService } from '../_services/index';

@Component({
   selector: 'app-layout',
   templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {

   public isNavbarCollapsed :boolean = true;

   public constructor (private authService :AuthService) {}

   public ngOnInit () {
      console.log(this.authService.isLoggedIn());
   }
}