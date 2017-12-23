import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../_services/index';

import { User } from '../_models/index';

import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkLoginAdmin(state.url);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.canActivate(route, state);
  }

  public checkLoginAdmin(url: string): boolean | Observable<boolean> {
    return this.authService.onLogin
      .map((user: User) => {

        console.log(`AdminGuard got`, user);

        if (user && user.isAdmin()) {
          return true;
        }

        this.router.navigate(['/']);
        return false;
      });
  }
}