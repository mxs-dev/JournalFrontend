import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../_shared/shared.module';

// Components
import { TeacherComponent   } from './teacher';


const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
    data: {
      title: 'Журнал|Преподаватель',
    }
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}
