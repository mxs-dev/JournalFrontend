import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from '../../../../_models';

import { Subject as rxSubject } from 'rxjs';
import { SubjectService } from '../../../../_services';


@Component({
  selector: 'app-subject-create',
  templateUrl: 'subject-create.component.html',
  styles: [`
  `]
})
export class SubjectCreateComponent implements OnInit, OnDestroy {


  protected componentDestroyed = new rxSubject<void>();


  public constructor (
    private subjectService: SubjectService
  ) { }


  public ngOnInit () {
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
