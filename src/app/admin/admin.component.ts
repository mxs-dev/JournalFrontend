import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { UserService, ApiService } from '../_services/index';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  protected componentDestroyed = new Subject();

  public constructor (
    private userService: UserService,
    private apiService:  ApiService
  ) {}

  public ngOnInit () {

  }

  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}