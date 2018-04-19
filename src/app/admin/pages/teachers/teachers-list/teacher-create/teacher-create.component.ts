import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { TeacherService } from '../../../../../_shared/services';
import { Teacher } from '../../../../../_shared/models';

import { Subject } from 'rxjs';



@Component({
  selector: 'app-teacher-create',
  templateUrl: './teacher-create.component.html',
  styles: [`
  `]
})
export class TeacherCreateComponent implements OnInit, OnDestroy {

  public toggled = false;
  public serverErrors: any;
  public isSubmitted = false;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private teacherService: TeacherService,
  ) {}
  

  public ngOnInit () { }


  public async createTeacher (teacherData: Teacher) {
    this.isSubmitted = true;
    
    console.log(teacherData); 

    try {
      const teacher = await this.teacherService.create(teacherData);
      
    } catch (e) {
      console.log(e);
    } finally {
      this.isSubmitted = false;
    }
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
