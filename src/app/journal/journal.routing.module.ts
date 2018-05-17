import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layout
import { JournalLayoutComponent } from './journal-layout.component';

// Components
import { TeacherComponent   } from './teacher';
import { AcademicPlanViewComponent } from './academic-plan-view';
import { JournalComponent } from './journal';



const routes: Routes = [
  {
    path: '',
    component: JournalLayoutComponent,
    children: [
      {
        path: 'teacher',
        component: TeacherComponent,
      },
      {
        path: 'teacher/:id',
        component: TeacherComponent,
      },
      {
        path: 'academic-plan/:id',
        component: AcademicPlanViewComponent
      },
      {
        path: 'journal/:id',
        component: JournalComponent
      }
    ]
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalRoutingModule {}
