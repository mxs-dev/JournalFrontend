import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, AuthService } from '../_services/index';
import { User } from '../_models/user';


import { Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  public isNavbarCollapsed: boolean = true;
  public currentUser: any  = false;

  private componetDestroyed = new Subject();

  public constructor(public authService: AuthService) { }

  public ngOnInit() {
    console.log(`MainLayout init!`);
    console.log(
    this.authService.onLogin
    .takeUntil(this.componetDestroyed)
    .subscribe(
      (user :User) => {
        console.log(`MainLayoutComponent`, user);
        this.currentUser = user;
      }, 
      (error :any) => {
        console.log(`Error`, error);
      }
    ));
  }

  public ngOnDestroy() {
    this.componetDestroyed.next(true);
    this.componetDestroyed.unsubscribe();
  }
}