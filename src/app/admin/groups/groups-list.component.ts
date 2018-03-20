import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from '../../_services/group.service';

import { Group } from '../../_models/index';

// import { GroupCreateComponent } from './group-create/group-create.component';


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit, OnDestroy {

  public groups: Group[];

  public isLoadingGroupsList = false;

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
    // TODO: разобраться почему unsubscribe вызывает ошибку
    // this.groupService.events.created.unsubscribe();
  }
}
