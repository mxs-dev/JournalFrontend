import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { User, Teacher, AcademicYear, Semester, Teaches } from '../../_shared/models';
import { TeacherService, AuthService, AlertService } from '../../_shared/services';

import { Subject } from 'rxjs';



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher-schedule.component.html'
})
export class TeacherScheduleComponent implements OnInit, OnDestroy {
  protected teacherId: number;

  public isLoadingTeacher = true;
  public isLoadingTeaches = false;
  public viewedTeacher: Teacher;
  public displayTeaches: Teaches[];

  public currentUser = this.authService.getCurrentUser();
  public moderAccess: boolean;

  protected semesterId: number;
  protected _cachedTeachesForSemesters: Array<{semesterId: number, teaches: Teaches[]}> = [];
  protected componentDestroyed = new Subject<void>();


  public constructor (
    private authService:    AuthService,
    private teacherService: TeacherService,
    private alertService:   AlertService,
    private activatedRoute: ActivatedRoute,
    private router:         Router,
    private location:       Location
  ) { }


  public ngOnInit () {
    this.moderAccess = this.currentUser.can(User.ROLE_MODER);

    this.activatedRoute.params
      .takeUntil(this.componentDestroyed)
      .subscribe(params => {
        this.setTeacherIdParam(params);
        this.loadTeacherWithYears();
    });

    this.activatedRoute.queryParams
      .takeUntil(this.componentDestroyed)
      .subscribe(params => {
        this.semesterId = Number(params['s']) || null;
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  public async viewTeaches (semester: Semester) {
    this.setSemesterIdToUrlParam(semester);
    this.displayTeaches = await this.loadTeachesForSemester(semester);
  }


  protected async loadTeachesForSemester(semester: Semester): Promise<Teaches[]> {
    const semesterFromCache = this._cachedTeachesForSemesters.find(item => semester.id === item.semesterId);
    let teaches;

    if (!semesterFromCache) {
      this.isLoadingTeaches = true;
      try {
        teaches = await this.teacherService.getTeachesBySemester(this.viewedTeacher, semester);
        this._cachedTeachesForSemesters.push({semesterId: semester.id, teaches: teaches});
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoadingTeaches = false;
      }
    } else {
      teaches = semesterFromCache.teaches;
    }

    return Promise.resolve(teaches);
  }


  protected async loadTeacherWithYears () {
    if (this.checkAccess()) {
      this.isLoadingTeacher = true;
      try {
        this.viewedTeacher = await this.teacherService.get(this.teacherId, [Teacher.EF_TEACHING_YEARS]);

      } catch (error) {
        console.log(error);

        if (error.status === 404) {
          this.alertService.error('Преподаватель не найден.');
          this.router.navigate(['/']);
        }

      } finally {
        this.isLoadingTeacher = false;
      }
      console.log(this.viewedTeacher);
    } else {
      this.alertService.error('Ошибка: Отказано в доступе', true);
      this.router.navigate(['/']);
    }
  }


  protected checkAccess () {
    if (this.moderAccess) return true;

    if (this.currentUser.isTeacher()) {
      if (this.teacherId === this.currentUser.id)
        return true;
    }

    return false;
  }


  protected setTeacherIdParam (params): boolean {
    this.teacherId = params['id'];

    if (!this.teacherId) {
      if (this.moderAccess) {
        this.alertService.error('Ошибка: Отсутствует параметр id преподавателя.', true);
        this.router.navigate(['/']);
        return false;

      } else
      if (this.currentUser.isTeacher()) {
        this.teacherId = this.currentUser.id;
        return true;
      }
    }

    return true;
  }


  protected setSemesterIdToUrlParam (semester: Semester) {
    // this.location.replaceState(this.router.createUrlTree([this.router.url], { queryParams: { s: semester.id } }).toString());
  }
}
