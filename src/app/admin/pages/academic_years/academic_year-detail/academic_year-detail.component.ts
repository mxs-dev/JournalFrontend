import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AcademicYearService, SemesterService, AlertService } from '../../../../_shared/services';
import { AcademicYear, Semester } from '../../../../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-academic-year-detail',
  templateUrl: 'academic_year-detail.component.html'
})
export class AcademicYearDetailComponent implements OnInit, OnDestroy {
 
  public isLoadingYear        = false;
  public isSubmittedYear      = false;
  public isSubmittedSemesters = false;
  
  public academicYear: AcademicYear;

  protected id: number;
  protected componentDestroyed = new Subject<void>();


  public constructor (
    private route:  ActivatedRoute,
    private router: Router,
    private yearService:     AcademicYearService,
    private semesterService: SemesterService,
    private alertService:    AlertService,
  ) {}


  public ngOnInit () {
    this.route.params
    .takeUntil(this.componentDestroyed)
    .subscribe(params => {
      this.id = params.id;
      this.loadAcademicYearWithSemesters();
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }


  public async onSubmitAcademicYear (year: AcademicYear) {
    this.isSubmittedYear = true;

    try {
      await this.yearService.update(this.academicYear, year) ;
    } catch (err) {
      console.log(err);
    } finally {
      this.isSubmittedYear = false;
    }
  }


  public async deleteSemester (semester: Semester) {
    semester._deleted = true;

    await this.semesterService.delete(semester);

    this.academicYear.semesters = this.academicYear.semesters.filter(item => item.id !== semester.id);
  }


  public addSemester (semester: Semester) {
    this.academicYear.semesters.push(semester);
  }


  protected async loadAcademicYearWithSemesters () {
    if (!this.id) {}

    this.isLoadingYear = true;
    try {
      this.academicYear = await this.yearService.get(this.id, [AcademicYear.EF_SEMESTERS]);

    } catch (error) {
      if (error.status === 404) {
        this.alertService.error('Ошибка: учебный год не существует.');
      }

      console.log(error);
    } finally {
      this.isLoadingYear = false;
    }

    console.log(this.academicYear);
  }
}
