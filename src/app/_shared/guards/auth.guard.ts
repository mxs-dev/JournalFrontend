import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';

import {AuthService} from '../services/index';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

   constructor(
      private authService: AuthService,
      private router: Router
   ) {}

   public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.checkLogin(state.url);
   }

   public canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.canActivate(route, state);
   }

   public checkLogin (url: string): boolean {

      if (this.authService.isLoggedIn()) {
        return true;
      } 
      
      this.authService.redirectUrl = url;

      this.router.navigate(['/login'], {queryParams: { r: url}});
      return false;
   }
}
