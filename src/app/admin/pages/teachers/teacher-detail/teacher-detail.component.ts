import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TeacherService } from '../../../../_services';
import { Teacher } from '../../../../_models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styles: [`
  `]
})
export class TeacherDetailComponent implements OnInit, OnDestroy {
  
  public teacher: Teacher;
  public isLoading: boolean;
  public isSubmitted: boolean;
  public toggled = false;

  protected teacherId: number;
  protected componentDestroyed = new Subject<void>();


  public constructor (
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService
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
      const res = await this.teacherService.update(this.teacherId, teacherData);
    
    } catch (error) {
      console.log(error);

    } finally {
      this.isSubmitted = false;
    }
  }


  protected async loadTeacher () {
    this.isLoading = true;

    try {
      this.teacher = await this.teacherService.get(this.teacherId);
//      this.teacher = await this.teacherService.get(this.teacherId, [Teacher.EXTRA_FIELD_ASSIGNED_SUBJECTS]);
    
    } catch (error) {
      if (error.status === 404) {
        this.router.navigate(['teachers/']);
      }
      console.log(error);
   
    } finally {
      this.isLoading = false;
    }
  }
} 
