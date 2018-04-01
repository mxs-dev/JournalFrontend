import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GroupService } from '../../../../_services/index';
import { Group, User  } from '../../../../_models/index';

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
    private groupService: GroupService
  ) { }


  public ngOnInit () {
    this.route.params
    .takeUntil(this.componentDestroyed)
    .subscribe(params => {
      this.groupId = params.id;
      this.loadGroup();
    });
  }


  public onSubmitGroup (groupData: any) {
    this.isSubmittedGroup = true;

    this.groupService.update(this.group.id, groupData)
    .then((res) => {
      this.isSubmittedGroup = false;
      this.loadGroup();
      console.log(res);
    })
    .catch((err) => {
      this.isSubmittedGroup = false;
      
      console.log(err);
    });
  }


  public async deleteStudent (student: User) {
    student.deleted = true;

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


  protected loadGroup () {

    this.isLoadingGroup = true;

    this.groupService.get(this.groupId)
      .then((group: Group) => {
        this.group = group;
        this.isLoadingGroup = false;

        this.loadStudents();
      })
      .catch((error) => {
        console.log(error);

        if (error.status === 404) {
          this.router.navigate(['/admin/groups']);
          // TODO: Отобразить ошибку "Группа не существует"
        }

        this.isLoadingGroup = false;
      });
  }


  protected loadStudents () {
    if (!this.group) {
      return;
    }

    this.isLoadingStudents = true;
    this.groupService.getStudents(this.group.id)
    .then((students: User[]) => {
      this.students = students;
      this.isLoadingStudents = false;
    })
    .catch((error) => {
      console.log(error);
    });
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
