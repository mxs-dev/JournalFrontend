import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { Subject } from '../../../../_models';

import { Subject as rxSubject } from 'rxjs';


@Component({
  selector: 'app-subject-form',
  templateUrl: 'subject-form.component.html',
  styles: [`
    :host{
      display: block;
    }
  `]
})
export class SubjectFormComponent implements OnInit, OnDestroy {

  @Input() subject: Subject;
  @Input() serverErrors: any;
  @Input() isSubmitted: boolean;

  @Output() onSubmit = new rxSubject<Subject>();
  @Output() onReset  = new rxSubject<void>();
  

  public formGroup: FormGroup;
  public formErrors: any;

  protected componentDestroyed = new rxSubject<void>();


  public constructor (
    private fb: FormBuilder
  ) { }


  public ngOnInit () {
    this.initSubjectForm();
    this.initFormErrors();
  }


  public isValid(fieldName: string, error?: string): boolean {

    if (!this.formGroup.controls[fieldName].touched) {
      return true;
    }

    if (!error) {
      return this.formGroup.controls[fieldName].valid;
    }

    return !this.formGroup.get(fieldName).hasError(error);
  }


  public resetForm () {
    this.formGroup.reset();
    this.onReset.next();
  }

  
  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected initSubjectForm (): void {
    this.formGroup = this.fb.group({
      title: [this.subject ? this.subject.title : '', Validators.compose([
        Validators.required,
        Validators.maxLength(10)
      ])],
      description: [this.subject ? this.subject.description : '', Validators.compose([
        Validators.maxLength(50)
      ])]
    });
  }


  protected initFormErrors (): void {
    this.formErrors = {
      required: 'Поле обязательно для ввода.',
      title: {
        length: 'Длинна поля не должна превышать 10 символов.'
      },
      description: {
        length: 'Длинна поля не должна превышать 50 символов.'
      }
    };
  }
}
