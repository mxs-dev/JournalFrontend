import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TeacherFormComponent } from '../teacher-form/teacher-form.component';

import { TeacherService, AlertService } from '../../../../_shared/services';
import { Teacher, Subject } from '../../../../_shared/models';

import { Subject as rxSubject } from 'rxjs';


@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styles: [`
  `]
})
export class TeacherDetailComponent implements OnInit, OnDestroy {
  
  @ViewChild(TeacherFormComponent) teacherForm: TeacherFormComponent;

  public teacher: Teacher;
  public isLoading: boolean;
  public isSubmitted: boolean;
  public toggled = false;

  protected teacherId: number;
  protected componentDestroyed = new rxSubject<void>();


  public constructor (
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private alertService: AlertService,
  ) {}


  public ngOnInit () {
    this.route.params
    .takeUntil(this.componentDestroyed)
    .subscribe((params) => { 
      this.teacherId = params['id'] || null; 
      this.loadTeacher();
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  public async updateTeacher(teacherData: Teacher) {
    this.isSubmitted = true;

    try {
      await this.teacherService.update(this.teacher, teacherData);
      console.log(this.teacher);
      this.teacherForm.refresh();
    } catch (error) {
      console.log(error);

    } finally {
      this.isSubmitted = false;
    }
  }


  public async addAssignedSubject (subject: Subject) {

  }


  public async deleteAssignedSubject (subject: Subject) {
    subject._deleted = true;

    try {
      const res = await this.teacherService.removeAssignedSubject(this.teacher, subject);
      if (res) {
        this.removeAssignedSubjectFromTeacher(subject);
      }
    
    } catch (error) {
      console.log(error);
    }
  }


  protected async loadTeacher () {
    if (this.teacherId == null) {
      this.router.navigate(['teachers/']);
    }

    this.isLoading = true;
    try {
      this.teacher = await this.teacherService.get(this.teacherId, [Teacher.EXTRA_FIELD_ASSIGNED_SUBJECTS]);
    
    } catch (error) {
      if (error.status === 404) {
        this.alertService.error('Ошибка: преподаватель не существует.');
        this.router.navigate(['teachers/']);
      }
      console.log(error);
   
    } finally {
      this.isLoading = false;
    }
  }

  protected removeAssignedSubjectFromTeacher (subject: Subject) {
    this.teacher.assignedSubjects = this.teacher.assignedSubjects.filter((item) => {
      return item.id !== subject.id;
    });
  }
} 
