import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent     } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { GROUP   } from './pages/groups';
import { STUDENT } from './pages/students';
import { SUBJECT } from './pages/subjects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    
    GROUP, STUDENT, SUBJECT
  ]
})
export class AdminModule { }
