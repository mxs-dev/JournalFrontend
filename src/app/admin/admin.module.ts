import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminComponent      } from './admin.component';
import { AdminRoutingModule  } from './admin-routing.module';
import { GroupsListComponent } from './groups/groups-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    GroupsListComponent
  ]
})
export class AdminModule { }
