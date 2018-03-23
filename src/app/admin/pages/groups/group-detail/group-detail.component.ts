import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  public isLoadingGroup   = true;
  public isSubmittedGroup = false;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private route: ActivatedRoute,
    private groupService: GroupService
  ) { }


  public ngOnInit () {
    this.route.params
    // .takeUntil(this.componentDestroyed)
    .subscribe(params => {
      this.groupId = params.id;
      this.loadGroup();
    });
  }


  public onSubmit (groupData: any) {
    this.isSubmittedGroup = true;

    this.groupService.update(this.group.id, groupData)
    .then((res) => {
      this.isSubmittedGroup = false;
     
     // TODO: Реализовать на сервере метод UPDATE и загонять возвращенную
     // в this.group
     
      this.loadGroup();
      console.log(res);
    })
    .catch((err) => {
      this.isSubmittedGroup = false;
      
      console.log(err);
    });
  }


  protected loadGroup () {

    this.isLoadingGroup = true;

    this.groupService.get(this.groupId)
      .then((group: Group) => {
        this.group = group;
        this.isLoadingGroup = false;

        console.log(group);

        this.groupService.getStudents(group.id)
          .then((students: User[]) => {
            this.students = students;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        this.isLoadingGroup = false;
      });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
