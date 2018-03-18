import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminGuard     } from '../_guards';

import { GroupsListComponent   } from './groups/groups-list.component';
import { StudentsListComponent } from './students/students-list.component';
import { SubjectsListComponent } from './subjects/subjects-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'groups',
        component: GroupsListComponent,
      },
      {
        path: 'students',
        component: StudentsListComponent,
      },
      {
        path: 'subjects',
        component: SubjectsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
