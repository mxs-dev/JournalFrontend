import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { Subject } from '../../../../../_shared/models';

import { Subject as rxSubject } from 'rxjs';

@Component({
  selector: 'app-assigned-subjects-list',
  templateUrl: 'assigned-subjects-list.component.html',
  styles: [`
  `]
})
export class AssignedSubjectsListComponent {
  @Input()  subjects: Subject[];
  @Output() onDelete = new rxSubject<Subject>();
}
