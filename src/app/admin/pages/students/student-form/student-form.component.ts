import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Student } from '../../../../_models';

import { Subject } from 'rxjs';



@Component({
  selector: 'app-student-form',
  templateUrl: 'student-form.component.html',
  styles: [`
  `]
})
export class StudentFormComponent implements OnInit, OnDestroy {

  @Input() student: Student;
  @Input() isSubmitted: boolean;
  @Input() serverErrors: any;

  @Output() onSubmit = new Subject<Student>();

  public formGroup: FormGroup;
  public formErrors: any;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private fB: FormBuilder
  ) {}

  
  public ngOnInit (): void {
    this.initForm();
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


  public ngOnDestroy (): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected initForm (): void {
    this.formGroup = this.fB.group({
      name:       [this.student ? this.student.name : '',       Validators.compose([Validators.required, Validators.maxLength(100)])],
      surname:    [this.student ? this.student.surname : '',    Validators.compose([Validators.required, Validators.maxLength(100)])],
      patronymic: [this.student ? this.student.patronymic : '', Validators.compose([Validators.required, Validators.maxLength(100)])],

      email: [
        this.student ? this.student.email : '',
        Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])
      ],
    });
  }


  protected initFormErrors (): void {
    this.formErrors = {
      required: 'Поле обязательно к заполнению.',

      name:       {
        maxlength: 'Длинна поля  не должна превышать 100 символов.'
      },
      surname:    {
        maxlength: 'Длинна поля не должна превышать 100 символов.'
      },
      patronymic: {
        maxlength: 'Длинна поля не должна превышать 100 символов.'
      },
      email: {
        maxlength: 'Длинна поля не должна превышать 255 символов.',
        email: 'Введите корректный адрес эл. почты.'
      },
    };
  }
}
