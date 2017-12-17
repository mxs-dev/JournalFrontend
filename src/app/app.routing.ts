import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { MainLayoutComponent } from './_layouts/main-layout.component';
import { P404Component } from './_pages/404.component';

import { AuthGuard } from './_guards/auth.guard';


export const routes :Routes = [
   {
      path: '',
      component: MainLayoutComponent,
      children: [
         {
            path: 'login',
            loadChildren: 'app/login/login.module#LoginModule'
         }
      ]
   },
   { path: '**', component: P404Component}
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {}