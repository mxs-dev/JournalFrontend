import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

import { ApiService } from '../../../../_services';


@Component({
  selector: 'app-subjects-list',
  templateUrl: 'subjects-list.component.html',
  styleUrls: ['subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit, OnDestroy {
  public isLoading = false;

  protected componentDestroyed = new Subject();


  public constructor (
    private apiService: ApiService,
  ) {}

  public ngOnInit () {

  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
  }
}
