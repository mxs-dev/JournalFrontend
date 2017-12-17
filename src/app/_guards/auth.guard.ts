import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {UserService} from '../_services/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

   constructor(
      private userService :UserService,
      private router :Router
   ){}

   public canActivate(route :ActivatedRouteSnapshot, state :RouterStateSnapshot) {
      return this.checkLogin(state.url);
   }

   public canActivateChild (route :ActivatedRouteSnapshot, state :RouterStateSnapshot) {
      return this.canActivate(route, state);
   }

   public checkLogin (url :string) :boolean {

      if (this.userService.isLoggedIn()) return true;


      this.userService.redirectUrl = url;

      this.router.navigate(['/login'], {queryParams: { r: url}});
      return false;
   }
}