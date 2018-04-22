import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { AcademicYear } from '../../../../../_shared/models';


@Component({
  selector: 'app-academic-year-form',
  templateUrl: 'academic_year-form.component.html',
  styles: [`
  `]
})
export class AcademicYearFormComponent {
  @Input() academicYear: AcademicYear;
}
