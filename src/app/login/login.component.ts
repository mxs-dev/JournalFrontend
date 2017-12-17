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
   private loginForm: FormGroup;
   private formErrors: any;
   private submitted: boolean = false;
   private errorMessage: string = '';
   private returnUrl: string = '/';

   public constructor(
      private userService: UserService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder
   ) {
      this.loginForm = formBuilder.group({
         username: ['', Validators.required],
         password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

      this.loginForm.valueChanges
         .subscribe(data => {
            this.onValueChanged(data);
         })
   }


   public ngOnInit() {
      this.resetFormErrors();
      this.userService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.activatedRoute.snapshot.queryParams['r'] || '/';
   }


   public onSubmit(elementValues: any) {
      this.submitted = true;
      this.userService.login(elementValues.username, elementValues.password)
         .subscribe(
         result => {
            if (result.success) {
               this.router.navigate([this.returnUrl]);
            } else {
               this.errorMessage = 'Username or password is incorrect.';
               this.submitted = false;
            }
         },
         error => {
            this.submitted = false;
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

   public onValueChanged(data?: any) {
      if (!this.loginForm) return;

      const form = this.loginForm;
      for (let field in this.formErrors) {
         let control = form.get(field);
         if (control && control.dirty) {
            this.formErrors[field].valid = true;
            this.formErrors[field].message = '';
         }
      }
   }


   private isValid(field: string): boolean {
      let isValid: boolean = false;

      // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
      if (this.loginForm.controls[field].touched == false) {
         isValid = true;
      }
      // If the field is touched and valid value, then it is considered as valid.
      else if (this.loginForm.controls[field].touched == true && this.loginForm.controls[field].valid == true) {
         isValid = true;
      }

      return isValid;
   }


   private resetFormErrors() {
      this.formErrors = {
         username: { valid: true, message: '' },
         password: { valid: true, message: '' }
      };
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