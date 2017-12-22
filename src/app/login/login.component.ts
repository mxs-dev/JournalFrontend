import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthService } from '../_services/index';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.formErrors = {
      username: {
        valid: true,
        message: 'Username is required'
      },
      password: {
        valid: true,
        message: 'Password must contain at least 4 letters'
      }
    };

    
    this.loginForm.valueChanges
    .takeUntil(this.componentDestroyed)
    .subscribe(
      data => {
          this.resetErrorsFromServer();
          this.errorMessage = '';
    });
  
  }

  
  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  public onSubmit(elementValues: any) {
    this.isSubmitted = true;
    this.authService.login(elementValues.username, elementValues.password)
      .subscribe(
      result => {
        if (result.success) {
          this.router.navigate([this.returnUrl]);
        } else {
          this.errorMessage = 'Username or password is incorrect.';
          this.isSubmitted = false;
        }
      },
      error => {
        this.isSubmitted = false;
        // Validation error
        if (error.status == 422) {

          this.errorMessage = "Some errors in form. Please check again.";

          let errorFields = JSON.parse(error.data.message);
          this.setErrorsFromServer(errorFields);
        } else {
          this.errorMessage = error.data;
        }
      }
      );
  }


  private isValid(field: string): boolean {
    let isValid: boolean = false;

    if (this.loginForm.controls[field].touched == false) {
      isValid = true;
    } else

      if (this.loginForm.controls[field].valid == true) {
        isValid = true;
      }

    return isValid;
  }


  private resetErrorsFromServer() {
    this.serverFormErrors = {
      username: {
        valid: true,
        message: '',
      },
      password: {
        valid: true,
        message: '',
      }
    }
  }


  private setErrorsFromServer(errorFields: any) {
    for (let key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) continue;

      let message = errorFields[key];
      this.serverFormErrors[key].valid = false;
      this.serverFormErrors[key].message = message;
    }
  }
}