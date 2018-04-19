import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminGuard     } from '../_shared/guards';

import { GroupsListComponent, GroupDetailComponent } from './pages/groups';
import { TeachersListComponent,  TeacherDetailComponent } from './pages/teachers';
import { StudentsListComponent, StudentDetailComponent } from './pages/students';
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
        path: 'students/:id',
        component: StudentDetailComponent,
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
