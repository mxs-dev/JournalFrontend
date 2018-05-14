import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { LessonService, TeachesService, AlertService } from '../../_shared/services';
import { Subject, Lesson, Teaches } from '../../_shared/models';

import { Subject as rxSubject } from 'rxjs';



@Component({
  selector: 'app-academic-plan-view',
  templateUrl: 'academic-plan-view.component.html',
})
export class AcademicPlanViewComponent implements OnInit, OnDestroy {
  protected teachesId: number;

  public viewedTeaches: Teaches;
  public isLoadingTeaches = true;

  protected componentDestroyed = new rxSubject<void>();

  public constructor (
    private lessonService:  LessonService,
    private teachesService: TeachesService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}


  public onCreate(lesson: Lesson) {
    this.alertService.success('Занятие успешно создано');
    this.viewedTeaches.lessons.unshift(lesson);
    this.viewedTeaches.lessons.sort((a, b) => {
      return a.date > b.date ? 1 : 0;
    });
  }


  public async deleteLesson(lesson: Lesson) {
    lesson._deleted = true;
    try {
      const res = await this.lessonService.delete(lesson);
    } catch (err) {
      console.log(err);
    } finally {
      this.removeLessonFromTheList(lesson);
      this.alertService.success('Занятие удалено успешно');
    }
  }


  public ngOnInit () {
    this.route.params
      .takeUntil(this.componentDestroyed)
      .subscribe(params => {
        this.teachesId = params['id'] || null;
        this.loadTeaches();
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  protected async loadTeaches () {
    this.isLoadingTeaches = true;
    try {
      this.viewedTeaches = await this.teachesService.get(this.teachesId, [
        Teaches.EF_GROUP, Teaches.EF_LESSONS, Teaches.EF_SUBJECT, Teaches.EF_TEACHER, Teaches.EF_SEMESTER
      ]);
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        this.alertService.error('Ошибка');
        this.location.back();
      }
    } finally {
      this.isLoadingTeaches = false;
    }
  }


  protected removeLessonFromTheList (lesson: Lesson): void {
    this.viewedTeaches.lessons = this.viewedTeaches.lessons.filter(item => item.id !== lesson.id);
  }
}
