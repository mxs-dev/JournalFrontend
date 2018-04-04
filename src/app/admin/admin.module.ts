import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent     } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { PaginationComponent } from '../_shared/pagination/pagination.component';


import { GROUPS_PAGE   } from './pages/groups';
import { STUDENTS_PAGE } from './pages/students';
import { SUBJECTS_PAGE } from './pages/subjects';
import { TEACHERS_PAGE } from './pages/teachers';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    PaginationComponent,
    
    GROUPS_PAGE, STUDENTS_PAGE, SUBJECTS_PAGE, TEACHERS_PAGE
  ],
  providers: [
    
  ]
})
export class AdminModule { }
