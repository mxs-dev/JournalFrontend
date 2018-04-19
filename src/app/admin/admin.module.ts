import { NgModule } from '@angular/core';


import { SharedModule       } from '../_shared/shared.module';
import { AdminComponent     } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { PaginationComponent } from '../_shared/pagination/pagination.component';


import { GROUPS_PAGE   } from './pages/groups';
import { STUDENTS_PAGE } from './pages/students';
import { SUBJECTS_PAGE } from './pages/subjects';
import { TEACHERS_PAGE } from './pages/teachers';


// PerfectScrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};



@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    PerfectScrollbarModule,
  ],
  declarations: [
    AdminComponent,
    PaginationComponent,
    
    GROUPS_PAGE, STUDENTS_PAGE, SUBJECTS_PAGE, TEACHERS_PAGE
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    } 
  ]
})
export class AdminModule { }
