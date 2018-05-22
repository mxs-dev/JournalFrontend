import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute       } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../../_shared/services/index';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public formErrors: any;
  public serverFormErrors: any;
  public isSubmitted: boolean;

  protected errorMessage: string;
  protected returnUrl:    string;

  protected componentDestroyed = new Subject<void>();

  public constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }


  public ngOnInit() {
    this.initFormErrors();
    this.resetErrorsFromServer();
    this.authService.logout();

    this.returnUrl = this.activatedRoute.snapshot.queryParams['r'] || '/';

    this.initForm();


    this.loginForm.valueChanges
    .takeUntil(this.componentDestroyed)
    .subscribe(
      data => {
        this.resetErrorsFromServer();
        this.errorMessage = '';
    });
  }


  public ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  public async onSubmit(elementValues: any) {
    this.isSubmitted = true;

    try {
      const result = await this.authService.login(elementValues.email, elementValues.password);
      if (result) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.errorMessage = 'Неверный логин или пароль.';
      }
    } catch (error) {
      if (Number(error.status) === 422) {

        this.errorMessage = 'Форма авторизации заполнена неверно.';

        const errorFields = JSON.parse(error.data.message);
        this.setErrorsFromServer(errorFields);
      } else {
        this.errorMessage = error.data;
      }

    } finally {
      this.isSubmitted = false;
    }
  }


  protected isValid (field: string): boolean {

    if (!this.loginForm.controls[field].touched) {
      return true;
    }

    return this.loginForm.controls[field].valid;
  }


  protected resetErrorsFromServer() {
    this.serverFormErrors = {
      email: {
        valid: true,
        message: '',
      },
      password: {
        valid: true,
        message: '',
      }
    };
  }


  protected setErrorsFromServer(errorFields: any) {
    for (const key in errorFields) {

      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) {
        continue;
      }

      const message = errorFields[key];
      this.serverFormErrors[key].valid = false;
      this.serverFormErrors[key].message = message;
    }
  }


  protected initForm () {
    this.loginForm = this.formBuilder.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  protected initFormErrors () {
    this.formErrors = {
      email: {
        valid: true,
        message: 'Введите корректный email'
      },
      password: {
        valid: true,
        message: 'Пароль должен содержать не менее 6 символов'
      }
    };
  }
}
