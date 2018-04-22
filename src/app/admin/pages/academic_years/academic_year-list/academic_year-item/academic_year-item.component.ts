import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { AcademicYear } from '../../../../../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-academic-year-item',
  templateUrl: 'academic_year-item.component.html'
})
export class AcademicYearItemComponent {
  @Input() academicYear: AcademicYear;
  @Output() onDelete = new Subject<AcademicYear>();

  public isLoading = false;
  public toggled   = false;
}
