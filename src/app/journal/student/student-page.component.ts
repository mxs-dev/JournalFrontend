import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StudentService, AuthService, AlertService } from '../../_shared/services';
import { Student, User } from '../../_shared/models';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-page',
  templateUrl: 'student-page.component.html',
  styles: [`
  `]
})
export class StudentPageComponent implements OnInit, OnDestroy {

  protected studentId:  number;
  protected currentUser: User;


  public isLoadingStudent = true;
  public student: Student;


  protected componentDestroyed = new Subject<void>();

  public constructor (
    private authService: AuthService,
    private alertService: AlertService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  public ngOnInit () {
    this.currentUser = this.authService.getCurrentUser();
    this.route.params.takeUntil(this.componentDestroyed)
    .subscribe(this.getRouteParamsAndLoadData.bind(this));
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  protected  getRouteParamsAndLoadData(params: any) {
    this.studentId = params['id'];

    if (this.checkAccess()) {
      this.loadStudentWithAcademicPerformance();
    } else {
      console.log('Oшибка доступа');
      this.alertService.error('Ошибка доступа', true);
      // this.router.navigate(['/']);
    }
  }


  protected async loadStudentWithAcademicPerformance () {
    this.isLoadingStudent = true;
    try {
      this.student = await this.studentService.get(this.studentId, [Student.EF_GROUP, 'academicPerformance']);
      this.recalculatePerformance();
      console.log(this.student);
    } catch (err) {
      console.log(err);

      if (err.status === 404) {
        this.alertService.error('Студент не сущестсвует', true);
        // this.location.back();
      }


    } finally {
      this.isLoadingStudent = false;
    }
  }


  protected checkAccess () {
    console.log(this.currentUser, this.studentId);

    if (+this.studentId === +this.currentUser.id || this.currentUser.can(User.ROLE_MODER)) {
      return true;
    }

    return false;
  }


  protected recalculatePerformance () {
    this.student.academicPerformance.forEach(year => {
      year.semesters.forEach(semester => {
        semester.teaches.forEach(teaches => {
          teaches.lessons.forEach(lesson => {
            lesson.grades = lesson.grades.filter(grade => +grade.userId === this.student.id);
          });
        });
      });
    });
  }
}
