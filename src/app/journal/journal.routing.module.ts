import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../_shared/shared.module';

// Components
import { TeacherComponent   } from './teacher';


const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: 'teacher/:id',
    component: TeacherComponent,
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}
