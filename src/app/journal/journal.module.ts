import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { JournalRoutingModule } from './journal.routing.module';

import { JournalLayoutComponent } from './journal-layout.component';

// Pages
import { TEACHER_SCHEDULE_PAGE   } from './teacher-schedule';
import { GROUP_SCHEDULE_PAGE } from './group-schedule';
import { ACADEMIC_PLAN_PAGE } from './academic-plan-view';
import { JOURNAl_PAGE } from './journal';
import { STUDENT_PAGE } from './student';
import { JOURNAL_SHARED } from './_shared';


@NgModule({
  imports: [
    SharedModule,
    JournalRoutingModule
  ],
  declarations: [
    JournalLayoutComponent,
    TEACHER_SCHEDULE_PAGE,
    GROUP_SCHEDULE_PAGE,
    ACADEMIC_PLAN_PAGE,
    JOURNAl_PAGE,
    STUDENT_PAGE,
    JOURNAL_SHARED,
  ],
  providers: [

  ]
})
export class JournalModule {}
