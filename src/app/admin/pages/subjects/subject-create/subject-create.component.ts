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
  public serverErrors: any;
  public toggled = false;
  public isSubmitted = false;

  protected componentDestroyed = new rxSubject<void>();


  public constructor (
    private subjectService: SubjectService
  ) { }


  public ngOnInit () { }
  

  public async createSubject (subject: Subject): Promise<void> {
    this.isSubmitted = true;

    try {
      const result = await this.subjectService.create(subject);
      this.isSubmitted = false;

    } catch (error) {
      if (error.status === 422) {
        this.serverErrors = JSON.parse(error.data.message);
        console.log(this.serverErrors);
      }

      this.isSubmitted = false;
    }
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
