import { NgModule } from '@angular/core';

import { SharedModule } from '../_shared/shared.module';

import { TEACHER_PAGE } from './teacher';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TEACHER_PAGE,

  ],
  providers: [

  ]
})
export class JournalModule {}
