import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Subject } from 'rxjs';

import { UserService, ApiService } from '../_shared/services/index';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  protected componentDestroyed = new Subject();


  public constructor (
    private userService: UserService,
    private apiService:  ApiService,
    private titleService: Title,
  ) {}


  public ngOnInit () {
    this.titleService.setTitle('Админ-панель');
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
