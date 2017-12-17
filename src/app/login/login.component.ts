import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../_services/index';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent {
   public  loginForm: FormGroup;
   public  formErrors :any;
   public  formErrorsDefault :any;
   public isSubmitted: boolean = false;
   private errorMessage: string = '';
   private returnUrl: string = '/';

   public constructor(
      private userService: UserService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      
   ) {
      this.loginForm = formBuilder.group({
         username: ['', Validators.required],
         password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.formErrorsDefault = {
         username: {
            message: 'Username is required'
         },
         password: {
            message: 'Password must contain at least 6 letters'
         }
      }
   }


   public ngOnInit() {
      this.resetFormErrors();
      this.userService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.activatedRoute.snapshot.queryParams['r'] || '/';
   }


   public onSubmit(elementValues: any) {
      this.isSubmitted = true;
      this.userService.login(elementValues.username, elementValues.password)
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
                  this.resetFormErrors();
                  // this._errorMessage = "There was an error on submission. Please check again.";
                  let errorFields = JSON.parse(error.data.message);
                  this.setFormErrors(errorFields);
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


   private resetFormErrors() {
      this.formErrors = Object.assign({}, this.formErrorsDefault);
   }


   private setFormErrors(errorFields: any) {
      for (let key in errorFields) {
         // skip loop if the property is from prototype
         if (!errorFields.hasOwnProperty(key)) continue;

         let message = errorFields[key];
         this.formErrors[key].valid = false;
         this.formErrors[key].message = message;
      }
   }
}