import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit, OnDestroy {
  
  protected componentDestroyed = new Subject<void>();

  public constructor (

  ) {}

  public ngOnInit () {

  }

  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
} 
