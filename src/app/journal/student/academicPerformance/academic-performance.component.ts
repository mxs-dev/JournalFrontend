import { Component, Input, Output } from '@angular/core';

import { AcademicYear } from '../../../_shared/models';


@Component({
  selector: 'app-academic-performance',
  templateUrl: 'academic-performance.component.html',
  styles: [`
  .label-practice {
    color:Gold;
  }
  .label-kr {
    color: MediumVioletRed;
  }
  .label-exam {
    color: Red;
  }
  `]
})
export class AcademicPerformanceComponent {
  @Input() year: AcademicYear;
  @Input() toggled = false;
}
