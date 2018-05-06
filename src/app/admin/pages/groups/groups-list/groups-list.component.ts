import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { GroupService } from '../../../../_shared/services';
import { Pager } from '../../../../_shared/pagination/pager';
import { Group } from '../../../../_shared/models/index';

import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit, OnDestroy {

  private readonly PAGE_SIZE = 7;

  @ViewChild('groupSearch', {read: ElementRef}) groupSearchInput: ElementRef;
  public allGroups:   Group[];

  public pager: Pager;

  public isLoadingGroupsList = false;


  protected componentDestroyed = new Subject<any>();

 
  public constructor (
    private groupService: GroupService,
    private route: ActivatedRoute,
  ) { }


  public ngOnInit () {
    this.pager = new Pager([], 1, this.PAGE_SIZE);

    this.route.queryParams
      .takeUntil(this.componentDestroyed)
      .subscribe(params => {
        this.pager.setPage(Number(params['p'] || 1));
    });
  
    this.loadAllGroups();
    this.subscribeToGroupServiceEvents();
    
    Observable.fromEvent(this.groupSearchInput.nativeElement, 'keyup')
      .takeUntil(this.componentDestroyed)
      .debounceTime(100)
      .subscribe(this.search.bind(this));
  }


  public async deleteGroup (group: Group) {
    group._deleted = true;

    try {
      const result = await this.groupService.delete(group);
      this.removeGroupFromList(group);
    } catch (e) {
      console.log(e);
    }
  }

  
  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected search () {
    const title = this.groupSearchInput.nativeElement.value;

    this.pager.setItems(this.allGroups.filter((group: Group) => {
      return group.title.search(new RegExp(title, 'i')) >= 0;
    }));
  }
  
  
  protected subscribeToGroupServiceEvents () {
    this.groupService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe((group: Group) => {
        this.allGroups.push(group);
        this.pager.setItems(this.allGroups);
    });
  }


  protected async loadAllGroups () {
    this.isLoadingGroupsList = true;
    
    try {
      this.allGroups = await this.groupService.getAll();
      this.pager.setItems(this.allGroups);
    } catch (e) {
      console.log(e);
    } finally {
      this.isLoadingGroupsList = false;
    }
  }


  protected removeGroupFromList(group: Group) {
    this.allGroups = this.allGroups.filter( (item: Group) => {
      return group.id !== item.id;
    });

    this.pager.setItems(this.allGroups);
  }
}
