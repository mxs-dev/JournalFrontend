import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserService, ApiService } from '../_services/index';

import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  protected componentDestroyed = new Subject();

  public constructor (
    private userService :UserService,
    private apiService :ApiService
  ) {}

  public ngOnInit () {

  }

  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}