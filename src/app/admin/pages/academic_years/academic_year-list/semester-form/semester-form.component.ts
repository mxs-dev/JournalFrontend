import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { Semester } from '../../../../../_shared/models';


@Component({
  selector: 'app-semester-form',
  templateUrl: 'semester-form.component.html',
  styles: [`
  `]
})
export class SemesterFormComponent {
  @Input() semester: Semester;
}
