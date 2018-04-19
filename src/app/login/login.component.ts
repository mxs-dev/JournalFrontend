import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute       } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../_shared/services/index';

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
  protected returnUrl: string;

  protected componentDestroyed = new Subject();

  public constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }


  public ngOnInit() {
    this.resetErrorsFromServer();
    this.authService.logout();

    this.returnUrl = this.activatedRoute.snapshot.queryParams['r'] || '/';


    this.loginForm = this.formBuilder.group({
      email:    ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

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

    this.loginForm.valueChanges
      .subscribe(
      data => {
        this.resetErrorsFromServer();
        this.errorMessage = '';
      });
  }


  public ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.unsubscribe();
  }


  public onSubmit(elementValues: any) {
    this.isSubmitted = true;
    this.authService.login(elementValues.email, elementValues.password)
      .subscribe(
        result => {
          if (result.success) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.errorMessage = 'Email or password is incorrect.';
            this.isSubmitted = false;
          }
        },
        error => {
          this.isSubmitted = false;
          // Validation error
          if (Number(error.status) === 422) {

            this.errorMessage = 'Some errors in form. Please check again.';

            const errorFields = JSON.parse(error.data.message);
            this.setErrorsFromServer(errorFields);
          } else {
            this.errorMessage = error.data;
          }
        }
      );
  }


  private isValid (field: string): boolean {
   
    if (!this.loginForm.controls[field].touched) {
      return true;
    }
      
    return this.loginForm.controls[field].valid;
  }


  private resetErrorsFromServer() {
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


  private setErrorsFromServer(errorFields: any) {
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
}
