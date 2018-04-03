import { Component, Input, Output } from '@angular/core';

import { SubjectService } from '../../../../_services';
import { Subject } from '../../../../_models';

import { Subject as rxSubject } from 'rxjs';


@Component({
  selector: 'app-subject-list-item',
  templateUrl: 'subjects-list-item.component.html',
  styles: [`
  `]
})
export class SubjectsListItemComponent {
  @Input()  subject: Subject;
  @Output() onDelete = new rxSubject<Subject>();

  public toggled     = false;
  public isSubmitted = false;

  public serverErrors: any;
 
  public constructor (
    private subjectService: SubjectService
  ) { }


  public async onSubmit (subjectData: Subject): Promise<void> {
    this.isSubmitted = true;

    try { 
      const updatedSubject = await this.subjectService.update(this.subject.id, subjectData);
      this.subject = updatedSubject;
      this.isSubmitted = false;
      this.toggled = false;

    } catch (error) {
      console.log(error);

      if (error.status === 422) {
        this.serverErrors = JSON.parse(error.data.message);
      }

      this.isSubmitted = false;
    }    
  }
}
