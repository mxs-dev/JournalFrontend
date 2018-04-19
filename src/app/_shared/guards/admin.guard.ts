import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { AuthService } from '../services/index';
import { User } from '../models/index';

import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return this.checkLoginAdmin(state.url);
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return this.canActivate(route, state);
  }

  public checkLoginAdmin(url: string): boolean | Promise<boolean> {
    return new Promise( async (resolve, reject) => {
      const user = await this.authService.getCurrentUser();

      if (user && user.isAdmin()) {
        return resolve(true);
      }

      return  resolve(false);
    });
  }
}
