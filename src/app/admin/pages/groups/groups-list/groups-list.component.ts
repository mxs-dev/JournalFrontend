import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GroupService, PagerService } from '../../../../_services';
import { Group } from '../../../../_models/index';

import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
})
export class GroupsListComponent implements OnInit, OnDestroy {

  private readonly PAGE_SIZE = 7;

  @ViewChild('groupSearch', {read: ElementRef}) groupSearchInput: ElementRef;

  public pagedGroups: Group[];
  public allGroups:   Group[];

  public pager: any = {};
  public page = 1;

  public isLoadingGroupsList = false;


  protected componentDestroyed = new Subject<any>();

 
  public constructor (
    private groupService: GroupService,
    private pagerService: PagerService,
    private route: ActivatedRoute,
  ) { }


  public ngOnInit () {
    this.route.queryParams
      .takeUntil(this.componentDestroyed)
      .subscribe(params => {
        this.page = Number(params['p']) || 1;
    });
  
    this.loadAllGroups();

    this.groupService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe((group: Group) => {
        this.allGroups.push(group);
        this.setPage(this.page);
    });

    Observable.fromEvent(this.groupSearchInput.nativeElement, 'keydown')
      .takeUntil(this.componentDestroyed)
      .debounceTime(1000)
      .subscribe((e) => {
        this.search(this.groupSearchInput.nativeElement.value);
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


  protected search (title: string) {
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected loadAllGroups (): void {
    this.isLoadingGroupsList = true;

    this.groupService.getAll()
      .then( (groups: Group[]) => {
        this.allGroups = groups;
        this.setPage(this.page);
        
        this.isLoadingGroupsList = false;
      })
      .catch( err => {
        console.log(err);
        this.isLoadingGroupsList = false;
      });
  }


  protected removeGroupFromList(group: Group) {
    this.allGroups = this.allGroups.filter( (item: Group) => {
      return group.id !== item.id;
    });
  }


  protected setPage(page: number) {

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.page = page;    

    this.pager = this.pagerService.getPager(this.allGroups.length, this.page, this.PAGE_SIZE);
    this.pagedGroups = this.allGroups.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
