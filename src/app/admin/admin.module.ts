import { NgModule } from '@angular/core';

// PerfectScrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { SharedModule       } from '../_shared/shared.module';
import { AdminComponent     } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';


import { GROUPS_PAGE   } from './pages/groups';
import { STUDENTS_PAGE } from './pages/students';
import { SUBJECTS_PAGE } from './pages/subjects';
import { TEACHERS_PAGE } from './pages/teachers';
import { ACADEMIC_YEARS_PAGE } from './pages/academic_years';





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
        
    GROUPS_PAGE,
    STUDENTS_PAGE, 
    SUBJECTS_PAGE, 
    TEACHERS_PAGE, 
    ACADEMIC_YEARS_PAGE,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    } 
  ]
})
export class AdminModule { }
