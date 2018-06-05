import { Component, Input, Output } from '@angular/core';
import { Teaches } from '../../../_shared/models';


@Component({
  selector: `app-schedule-item`,
  templateUrl: 'schedule-item.component.html'
})
export class ScheduleItemComponent {
  @Input() teaches: Teaches;
  @Input() moderAccess: boolean;
}
