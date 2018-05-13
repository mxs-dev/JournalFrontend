import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-academic-plan-view',
  templateUrl: 'academic-plan-view.component.html',
})
export class AcademicPlanViewComponent {
  protected teachesId: number;

  public constructor (
  ) {}
}
