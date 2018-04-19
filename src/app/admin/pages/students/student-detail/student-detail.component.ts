import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentService, AlertService } from '../../../../_shared/services';

import { Subject } from 'rxjs';
import { Student } from '../../../../_shared/models';


@Component({
  selector: 'app-student-detail',
  templateUrl: 'student-detail.component.html'
})
export class StudentDetailComponent implements OnInit, OnDestroy {

  public student: Student;
  public isLoading = false;

  protected studentId: number;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private studentService: StudentService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  public ngOnInit () {
    this.route.params.takeUntil(this.componentDestroyed)
      .subscribe(params => {
        this.studentId = params.id || null;
        this.loadStudent();
      });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected async loadStudent () {
    if (this.studentId !== null) {
      this.isLoading = true;
      try {
        this.student = await this.studentService.get(this.studentId);
      } catch (error) {
        if (error.status === 404) {
          this.alertService.error('Ошибка: Студент не существует', true);
          this.router.navigate(['admin/students']);
        }
      } finally {
        this.isLoading = false;
      }
     
    } else {
      this.router.navigate(['admin/students']);
    }
  }
}
