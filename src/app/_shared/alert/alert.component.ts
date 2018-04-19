import { Component, OnInit, OnDestroy } from '@angular/core';

import { AlertService } from '../services';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styles : [`
    div {
      position: relative;
    }
  `]
})
export class AlertComponent implements OnInit, OnDestroy {
  public message: any;

  protected componentDestroyed = new Subject<void>();

  public constructor (
    private alertService: AlertService,
  ) {}

  public ngOnInit () {
    this.alertService.getMessage()
      .takeUntil(this.componentDestroyed)
      .subscribe(message => this.message = message);
  }


  public cancel () {
    this.message = undefined;
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  } 
}
