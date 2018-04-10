import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminGuard     } from '../_guards';

import { GroupsListComponent, GroupDetailComponent } from './pages/groups';
import { TeachersListComponent,  TeacherDetailComponent } from './pages/teachers';
import { StudentsListComponent } from './pages/students';
import { SubjectsListComponent } from './pages/subjects';


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
        path: 'groups/:id',
        component: GroupDetailComponent
      },
      {
        path: 'students',
        component: StudentsListComponent,
      },
      {
        path: 'subjects',
        component: SubjectsListComponent
      },
      {
        path: 'teachers',
        component: TeachersListComponent,
      },
      {
        path: 'teachers/:id',
        component: TeacherDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
