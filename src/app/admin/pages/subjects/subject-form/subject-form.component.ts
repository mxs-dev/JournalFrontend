import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { Subject } from '../../../../_models';

import { Subject as rxSubject } from 'rxjs';


@Component({
  selector: 'app-subject-form',
  templateUrl: 'subject-form.component.html',
  styles: [`
  `]
})
export class SubjectFormComponent implements OnInit, OnDestroy {

  @Input() subject: Subject;
  @Input() serverErrors: any;
  @Output() onSubmit = new rxSubject<Subject>();

  public formGroup: FormGroup;
  public formErrors: any;

  protected componentDestroyed = new rxSubject<void>();


  public constructor (
    private fb: FormBuilder
  ) { }


  public ngOnInit () {
    this.createSubjectForm();

    this.formErrors = {
      required: 'Поле обязательно для ввода',
      title: {
        length: 'Длинна поля должна быть от 5 до 10 символов'
      }
    };
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected createSubjectForm (): void {
    this.formGroup = this.fb.group({
      title: [this.subject ? this.subject.title : '', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])],
      description: [this.subject ? this.subject.title : '', Validators.compose([

      ])]
    });
  }
}
