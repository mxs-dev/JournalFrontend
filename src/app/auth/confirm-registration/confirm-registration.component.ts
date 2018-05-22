import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../_shared/services';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-comfirm-registration',
  templateUrl: 'confirm-registration.component.html',
  styles: [`
  `]
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy {

  public result: any;
  public isSubmitted: boolean;

  protected emailConfirmToken: string;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  public ngOnInit () {
    this.route.queryParams
      .takeUntil(this.componentDestroyed)
      .subscribe(this.queryParamsSubscriber.bind(this));
  }

  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  protected queryParamsSubscriber (params: any) {
    this.emailConfirmToken = params['token'];

    if (!this.emailConfirmToken) {
      this.result = {
        status: false,
        message: 'Ошибка.'
      };
    }
  }

  protected async confirm (form: any) {
    this.isSubmitted = true;

    console.log(form);


    try {
      const res = await this.authService.confirmRegistration(this.emailConfirmToken, form.password);

      if (res) {
        this.result = {
          status: true,
        };
      } else {
        this.result = {
          status: false,
          message: 'Ошибка.'
        };
      }
    } catch (err) {
      console.log(err);
      this.result = {
        status: false,
        message: 'Ошибка.'
      };
    } finally {
      this.isSubmitted = false;
    }
  }
}
