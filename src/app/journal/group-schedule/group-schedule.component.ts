import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { User, Group, AcademicYear, Semester, Teaches } from '../../_shared/models';
import { TeacherService, AuthService, AlertService, GroupService } from '../../_shared/services';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-schedule',
  templateUrl: './group-schedule.component.html'
})
export class GroupScheduleComponent implements OnInit, OnDestroy {
  protected groupId: number;

  public toggledAddBlock = true;

  public isLoadingGroup = true;
  public group: Group;
  public displayTeaches: Teaches[] = [];

  public currentUser = this.authService.getCurrentUser();
  public moderAccess: boolean;

  protected semesterId: number;
  protected currentSemester: Semester;
  protected componentDestroyed = new Subject<void>();


  public constructor (
    private authService:    AuthService,
    private groupService:   GroupService,
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
        this.setGroupIdParam(params);
        this.loadGroupWithShedule();
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


  public setSemester (semester) {
    this.currentSemester = semester;
    this.setSemesterIdToUrlParam(semester);
    this.viewTeaches();
  }


  public viewTeaches () {
    this.displayTeaches = this.group.teaches.filter(item => +item.semesterId === +this.currentSemester.id);
  }


  public async loadGroupWithShedule () {
    if (this.checkAccess()) {
      this.isLoadingGroup = true;
      try {
        this.group = await this.groupService.get(this.groupId, [Group.EF_TEACHES_SUBJECT_TEACHER, Group.EF_STUDYING_YEARS]);
      } catch (err) {
        console.log(err) ;
      } finally {
        this.isLoadingGroup = false;
      }
    } else {
      this.alertService.error('Ошибка: Отказано в доступе', true);
      this.router.navigate(['/']);
    }
  }


  public addScheduleElement (elem) {
    this.group.teaches.push(elem);
    this.viewTeaches();
  }


  protected checkAccess () {
    if (this.moderAccess) return true;

    return false;
  }


  protected setGroupIdParam(params): boolean {
    this.groupId = params['id'];

    if (!this.groupId) {
      this.alertService.error('Ошибка: Отсутствует параметр id группы', true);
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }


  protected setSemesterIdToUrlParam (semester: Semester) {
    // this.location.replaceState(this.router.createUrlTree([this.router.url], { queryParams: { s: semester.id } }).toString());
  }
}
