import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../_services/group.service';

import { Group } from '../../_models/index';

// import { GroupCreateComponent } from './group-create/group-create.component';


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit {

  public groups: Group[];

  public isLoadingGroupsList = false;
  public isErrorWhileLoading = false;

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
        this.isErrorWhileLoading = true;
      });
  }


}
