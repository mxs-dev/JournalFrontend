import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { Semester, AcademicYear } from '../../../../../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-semesters-list-item',
  templateUrl: 'semester-item.component.html',
  styles: [``]
})
export class SemesterItemComponent {
  @Input() semester:     Semester;
  @Input() academicYear: AcademicYear;

  @Output() onDelete = new Subject<Semester>();

  public toggled = false;
}
