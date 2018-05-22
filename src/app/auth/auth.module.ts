import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../_shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent     } from './login/login.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ConfirmRegistrationFormComponent } from './confirm-registration/confirm-registration-form.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    ConfirmRegistrationComponent,
    ConfirmRegistrationFormComponent
  ]
})
export class AuthModule {}
