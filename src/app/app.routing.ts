import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Layouts
import { MainLayoutComponent } from './_layouts/main-layout.component';
import { P404Component } from './_pages/404.component';

import { IndexPageComponent } from './index';

// Guards
import { AuthGuard, AdminGuard } from './_shared/guards/index';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: IndexPageComponent
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: 'app/journal/journal.module#JournalModule'
      }
    ]
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
     // canActivate: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: 'app/admin/admin.module#AdminModule'
      }
    ]
  },
  {
    path: 'login',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: 'app/login/login.module#LoginModule',
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
