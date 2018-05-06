import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { Semester, AcademicYear } from '../../../../../_shared/models';

import { Subject } from 'rxjs';
import { SemesterService } from '../../../../../_shared/services';


@Component({
  selector: 'app-semester-create',
  templateUrl: 'semester-create.component.html',
  styles: [``]
})
export class SemesterCreateComponent {
  @Input()  academicYear: AcademicYear;
  @Output() onCreate = new Subject<Semester>();

  public toggled      = false;
  public isSubmitted  = false;
  public serverErrors = {};

  public constructor (
    private semesterService: SemesterService,
  ) {}


  public async createSemester (modelData: Semester) {
    this.isSubmitted = true;
    let semester: Semester;

    try {
      semester = await this.semesterService.create({
        yearId: this.academicYear.id,        
        ...modelData,
      });
    } catch (err) {
      if (err.status === 422) {
        this.serverErrors = JSON.parse(err.data.message);
      } else {

      }
    } finally {
      this.isSubmitted = false;
    }

    if (semester) this.onCreate.next(semester);
  }
}
