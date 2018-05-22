import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';

import { LessonService, GradeService } from '../../../_shared/services';
import { Lesson, Grade } from '../../../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-journal-cell',
  templateUrl: 'journal-cell.component.html',
  styleUrls: ['journal-cell.component.scss'],
  providers: [
    NgbPopoverConfig
  ]
})
export class JournalCellComponent implements OnInit, OnDestroy {

  @Input() moderAccess: boolean;
  @Input() currentDate: Date;
  @Input() grade:       Grade;

  @ViewChild('popover') optionsPopover;

  public isSubmitted = false;

  public constructor (
    private lessonService: LessonService,
    private gradeService: GradeService,
    popoverConfig: NgbPopoverConfig
  ) {
    popoverConfig.placement = 'bottom';
  }


  public ngOnInit () {
  }


  public async saveGrade (gradeData: Grade) {
    console.log(gradeData);
    this.isSubmitted = true;

    gradeData.lessonId = this.grade.lessonId;
    gradeData.userId   = this.grade.userId;

    if (this.grade.id) {
      try {
        await this.gradeService.update(this.grade, gradeData);
      } catch (err) { console.log(err); }
      finally {
        this.isSubmitted = false;
      }

    } else {
      try {
        const createdGrade = await this.gradeService.create(gradeData);
        this.grade = Object.assign(this.grade, createdGrade);
      } catch (err) { console.log(err); }
      finally {
        this.isSubmitted = false;
      }
    }

    this.optionsPopover.close();
  }

  public ngOnDestroy () {

  }
}
