import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from '../../../../_services/group.service';

import { Group } from '../../../../_models/index';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit, OnDestroy {

  public groups: Group[];

  public isLoadingGroupsList = false;

  protected componentDestroyed = new Subject<any>();


  public constructor (
    private groupService: GroupService
  ) { }


  public ngOnInit () {
    this.isLoadingGroupsList = true;

    this.groupService.getAll()
      .then( (groups: Group[]) => {
        this.groups = groups;
        this.isLoadingGroupsList = false;
      })
      .catch( err => {
        console.log(err);
        this.isLoadingGroupsList = false;
      });

    this.groupService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe((group: Group) => {
        this.groups.push(group);
      });
  }


  public deleteGroup (group: Group) {
    group.deleted = true;

    this.groupService.delete(group.id)
      .then( deleted => {
        if (deleted) {
          this.removeGroupFromList(group);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }


  protected removeGroupFromList(group: Group) {
    this.groups = this.groups.filter( (item: Group) => {
      return group.id !== item.id;
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
