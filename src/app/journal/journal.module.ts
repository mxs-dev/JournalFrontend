import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { JournalRoutingModule } from './journal.routing.module';


// Pages
import { TEACHER_PAGE   } from './teacher';
import { ACADEMIC_PLAN_PAGE } from './academic-plan-view';


@NgModule({
  imports: [
    SharedModule,
    JournalRoutingModule
  ],
  declarations: [
    TEACHER_PAGE,
    ACADEMIC_PLAN_PAGE,
  ],
  providers: [

  ]
})
export class JournalModule {}
