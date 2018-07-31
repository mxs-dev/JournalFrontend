import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services';
import { User } from '../_shared/models';


@Component({
  selector: 'app-index',
  templateUrl: 'index-page.component.html',
})
export class IndexPageComponent implements OnInit{

  public constructor (
    private authService: AuthService,
    private router: Router,
  ) {}

  public ngOnInit () {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      switch (currentUser.role) {
        case User.ROLE_ADMIN:
        case User.ROLE_MODER: this.router.navigate(['/admin']); return;

        case User.ROLE_TEACHER: this.router.navigate(['teacher']); return;
        case User.ROLE_STUDENT: this.router.navigate(['student', currentUser.id]); return;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
