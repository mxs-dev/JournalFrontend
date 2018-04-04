import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { TeacherService } from '../../../../_services';
import { Teacher } from '../../../../_models';

import { Subject } from 'rxjs';



@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styles: [`
  `]
})
export class TeacherCreateComponent implements OnInit, OnDestroy {

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private teacherService: TeacherService,
  ) {}
  

  public ngOnInit () {

  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
