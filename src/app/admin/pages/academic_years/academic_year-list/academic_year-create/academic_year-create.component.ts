import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IOverlayComponent } from '../../../../../_shared/overlay';
import { AcademicYearService, AlertService, SemesterService } from '../../../../../_shared/services';
import { AcademicYear, ApiError } from '../../../../../_shared/models';


import { Subject } from 'rxjs';


@Component({
  selector: 'app-academic-year-create',
  templateUrl: 'academic_year-create.component.html'
})
export class AcademicYearCreateComponent {

  public toggled     = false;
  public isSubmitted = false;
  public componentDestroyed = new Subject<void>();


  public constructor (
    private router: Router,
    private yearService: AcademicYearService,
    private alertService: AlertService,
  ) {}


  public async onSubmit (formData: AcademicYear) {
    let year;

    try {
      year = await this.yearService.create(formData);
    
    } catch (error) {
      console.log(error);
      this.alertService.error(error.data.message);

    } finally {
      this.isSubmitted = false;
    }

    this.alertService.success('Учебный год успешно создан.', true);
    this.router.navigate(['admin/academic-years/', year.id]);
  }
} 
