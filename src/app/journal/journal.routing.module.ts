import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layout
import { JournalLayoutComponent } from './journal-layout.component';

// Components
import { TeacherScheduleComponent   } from './teacher-schedule';
import { AcademicPlanViewComponent } from './academic-plan-view';
import { StudentPageComponent } from './student';
import { JournalComponent } from './journal';
import { GroupScheduleComponent } from './group-schedule';



const routes: Routes = [
  {
    path: '',
    component: JournalLayoutComponent,
    children: [
      {
        path: 'teacher',
        component: TeacherScheduleComponent,
      },
      {
        path: 'teacher/:id',
        component: TeacherScheduleComponent,
      },
      {
        path: 'student/:id',
        component: StudentPageComponent
      },
      {
        path: 'group-schedule/:id',
        component: GroupScheduleComponent,
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
