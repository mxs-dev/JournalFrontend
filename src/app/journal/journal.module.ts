import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';
import { JournalRoutingModule } from './journal.routing.module';


// Pages
import { TEACHER_PAGE   } from './teacher';


@NgModule({
  imports: [
    SharedModule,
    JournalRoutingModule
  ],
  declarations: [
    TEACHER_PAGE,
  ],
  providers: [

  ]
})
export class JournalModule {}
