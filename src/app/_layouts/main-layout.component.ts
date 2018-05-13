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

  protected componetDestroyed = new Subject<void>();

  public constructor(
    public authService: AuthService
  ) {}


  public ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    this.authService.onAuthChange
    .takeUntil(this.componetDestroyed)
    .subscribe((user: User|null) => {
      setTimeout(() => this.currentUser = user, 1);
    });
  }


  public ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }
}
