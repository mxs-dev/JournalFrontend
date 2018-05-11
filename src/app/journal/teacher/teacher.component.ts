import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Teacher, AcademicYear, Semester, Teaches } from '../../_shared/models';
import { TeacherService, AuthService, AlertService } from '../../_shared/services';


import { Subject } from 'rxjs';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit, OnDestroy {

  protected teacherId: number;

  public isLoadingTeacher = true;
  public isLoadingTeaches = true;
  public teacher: Teacher;
  public displayTeaches: Teaches[];


  protected _cachedTeachesForSemesters: Array<{semesterId: number, teaches: Teaches[]}> = [];
  protected componentDestroyed = new Subject<void>();

  public constructor (
    private authService:    AuthService,
    private teacherService: TeacherService,
    private alertService:   AlertService,
    private activatedRoute: ActivatedRoute,
    private router:         Router
  ) { }


  public ngOnInit () {
    this.activatedRoute.params
    .takeUntil(this.componentDestroyed)
    .subscribe(params => {
      this.teacherId = params.id || null;
      this.loadTeacherWithYears();
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  public async viewTeaches (semester: Semester) {
    const semesterFromCache = this._cachedTeachesForSemesters.find(item => semester.id === item.semesterId);

    if (semesterFromCache) {
      this.displayTeaches = semesterFromCache.teaches;
    } else {
      this.isLoadingTeaches = true;
      try {
        const teaches = await this.teacherService.getTeachesBySemester(this.teacher, semester);

        this._cachedTeachesForSemesters.push({semesterId: semester.id, teaches: teaches});
        this.displayTeaches = teaches;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoadingTeaches = false;
      }
    }

    console.log(this.displayTeaches);
  }


  protected async loadTeacherWithYears () {
    if (this.checkAccess()) {
      this.isLoadingTeacher = true;
      try {
        this.teacher = await this.teacherService.get(this.teacherId, [Teacher.EF_TEACHING_YEARS]);

      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingTeacher = false;
      }
      console.log(this.teacher);
    }
  }


  protected checkAccess () {
    if (!this.teacherId) {
      const currentUser = this.authService.getCurrentUserFromJWT();

      if (currentUser.isAdmin() || currentUser.isModer()) {
        this.alertService.error('Ошибка: Отсутствует параметр id преподавателя.', true);
        this.router.navigate(['/']);
        return false;

      } else
      if (currentUser.isTeacher()) {
        this.teacherId = currentUser.id;

        return true;
      } else {
        this.alertService.error('Ошибка', true);
        this.router.navigate(['/']);
        return false;
      }
    }

    return true;
  }
}
