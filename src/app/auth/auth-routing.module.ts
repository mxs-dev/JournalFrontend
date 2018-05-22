import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
      path: 'confirm-registration',
      component: ConfirmRegistrationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
