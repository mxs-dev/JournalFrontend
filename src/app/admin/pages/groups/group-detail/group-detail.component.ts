import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupService, AlertService } from '../../../../_shared/services/index';
import { Group, User  } from '../../../../_shared/models/index';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-detail',
  templateUrl: 'group-detail.component.html',
  styleUrls: ['group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {

  public groupId: number;
  public group: Group;
  public students: User[];

  public toggledForm = false;

  public isLoadingGroup    = true;
  public isLoadingStudents = true;

  public isSubmittedGroup   = false;
  public isSubmittedStudent = false;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private alertService: AlertService,
  ) { }


  public ngOnInit () {
    this.route.params
    .takeUntil(this.componentDestroyed)
    .subscribe(params => {
      this.groupId = params.id;
      this.loadGroup();
    });
  }


  public async onSubmitGroup (groupData: any) {
    this.isSubmittedGroup = true;

    try {
      await this.groupService.update(this.group, groupData);
    } catch (error) {
      console.log(error);
    } finally {
      this.isSubmittedGroup = false;
    }
  }


  public async deleteStudent (student: User) {
    student._deleted = true;

    try {
      const success = await this.groupService.removeStudent(this.group.id, student.id);

      if (success) {
        this.removeStudentFromList(student);
      }
    } catch (e) {
      console.log(e);
    }  
  }

  
  public addStudent (student: User) {
    this.students.push(student);
    console.log('Student added', student);    
  }


  public studentCreated (student: User) {
    this.students.push(student);
    console.log('Student created', student);
  }


  protected async loadGroup () {
    if (this.groupId == null) {
      this.router.navigate(['/admin/groups']);
    }

    this.isLoadingGroup = true;
    try {
      this.group = await this.groupService.get(this.groupId);
      this.loadStudents();
    } catch (error) {
      console.log(error);

      if (error.status === 404) {
        this.router.navigate(['/admin/groups']);
        this.alertService.error('Ошибка: группа не существует.');
      }
    } finally {
      this.isLoadingGroup = false;
    }
  }


  protected async loadStudents () {
    if (!this.group) {
      return;
    }

    this.isLoadingStudents = true;
    try {
      this.students = await this.groupService.getStudents(this.group.id);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoadingStudents = false;
    }
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected removeStudentFromList (student: User) {
    this.students = this.students.filter((item: User) => {
      return student.id !== item.id;
    });
  }
}
