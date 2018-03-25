import { Component, OnInit, OnDestroy } from '@angular/core';

import { StudentService } from '../../../../_services/index';

import { Subject } from 'rxjs';
import { User, ApiError } from '../../../../_models';


@Component({
  selector: 'app-student-create',
  templateUrl: 'student-create.component.html',
  styleUrls: ['student-create.component.scss']
})
export class StudentCreateComponent implements OnInit, OnDestroy {
  
  public toggled:     boolean;
  public isSubmitted: boolean;

  public serverErrors: any;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private studentService: StudentService
  ) {}


  public ngOnInit () {
    this.toggled     = false;
    this.isSubmitted = false;
  }


  public onSubmit(data: any) {
    this.isSubmitted = true;

    this.studentService.create(data)
    .then((student: User) => {
      console.log(student);

      this.isSubmitted = false;
    })
    .catch((err: ApiError) => {
      this.serverErrors = err.data;
      this.isSubmitted = false;
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
