import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TeachesService, LessonService, AuthService, AlertService } from '../../_shared/services';
import { Teaches, Grade, Student } from '../../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-journal',
  templateUrl: 'journal.component.html'
})
export class JournalComponent implements OnInit, OnDestroy {
  protected teachesId: number;
  protected currentUser = this.authService.getCurrentUser();

  public teaches: Teaches;
  public isLoadingTeaches = true;


  public studentsWithGrades: Student[];


  protected componentDestroyed = new Subject<void>();

  public constructor (
    private teachesService: TeachesService,
    private lessonService: LessonService,
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}


  public ngOnInit () {
    this.route.params.takeUntil(this.componentDestroyed)
      .subscribe(this.getRouteParamsAndLoadData.bind(this));
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  protected getRouteParamsAndLoadData (params: any) {
    this.teachesId = params['id'];

    if (!this.checkAccess()) return;

    this.loadTeaches();
  }


  protected async loadTeaches () {
    this.isLoadingTeaches = true;
    try {
      this.teaches = await this.teachesService.get(this.teachesId, [
        Teaches.EF_GROUP_STUDENTS, Teaches.EF_TEACHER, Teaches.EF_LESSONS_GRADES
      ]);
    } catch (err) {
      console.log(err);

      if (err.status === 401 || err.status === 404) {
        this.alertService.error('Ошибка.', true);
        this.location.back();
      }

    } finally {
      this.isLoadingTeaches = false;
    }

    console.log(this.teaches);
    this.createStudentWithGradesObj();
    console.log(this.studentsWithGrades);
  }


  protected checkAccess () {
    return true;
  }


  protected createStudentWithGradesObj () {
    this.studentsWithGrades = [];

    this.teaches.group.students.forEach(student => {
      const grades = [];

      // Для каждого занятия находим соответствующую оценку или создаем пустую
      this.teaches.lessons.forEach(lesson => {
        const foundGrade = lesson.grades.find((item) => {
          return item.userId === student.id;
        });

        grades.push(foundGrade ? foundGrade : new Grade({
          userId: student.id,
          lessonId: lesson.id
        }));
      });

      student.grades = grades;
      this.studentsWithGrades.push(student);
    });
  }
}
