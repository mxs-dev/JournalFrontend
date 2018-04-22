import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService, AuthService } from '../_shared/services/index';
import { User } from '../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  public isNavbarCollapsed = true;
  public currentUser: User;

  private componetDestroyed = new Subject<void>();

  public constructor(
    public authService: AuthService
  ) {}


  public async ngOnInit() {

    this.currentUser = await this.authService.getCurrentUser();

    this.authService.onLogin
    .takeUntil(this.componetDestroyed)
    .subscribe((user: User) => {
      this.currentUser = user;
    });
  }


  public ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }
}
