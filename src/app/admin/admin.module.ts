import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent     } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { GROUP } from './groups/index';
import { StudentsListComponent } from './students/students-list.component';
import { SubjectsListComponent } from './subjects/subjects-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    GROUP,
    SubjectsListComponent,
    StudentsListComponent,
  ]
})
export class AdminModule { }
