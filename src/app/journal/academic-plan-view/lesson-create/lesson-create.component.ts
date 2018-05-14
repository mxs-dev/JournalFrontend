import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { LessonService } from '../../../_shared/services';
import { Teaches, Lesson } from '../../../_shared/models';

import { Subject } from 'rxjs';



@Component({
  selector: 'app-lesson-create',
  templateUrl: 'lesson-create.component.html'
})
export class LessonCreateComponent implements OnInit, OnDestroy {
  @Input() teaches: Teaches;
  @Output() onCreate = new EventEmitter<Lesson>();

  public toggled     = false;
  public isSubmitted = false;

  protected componentDestroyed = new Subject<void>();

  public constructor (
    private lessonService: LessonService
  ) {}


  public async onSubmit (formData: any) {
    this.isSubmitted = true;
    try {
      const lesson = await this.lessonService.create({...formData, teachesId: this.teaches.id});
      this.onCreate.emit(lesson);
    } catch (err) {
      console.log(err);
    } finally {
      this.isSubmitted = false;
    }
  }

  public onReset () {

  }


  public ngOnInit () {

  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
