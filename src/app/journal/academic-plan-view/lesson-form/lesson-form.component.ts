import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

import { BaseReactiveFormComponent } from '../../../_shared/base-components/base-reactive-form.component';
import { Lesson, Teaches } from '../../../_shared/models';


@Component({
  selector: 'app-lesson-form',
  templateUrl: 'lesson-form.component.html',
})
export class LessonFormComponent extends BaseReactiveFormComponent<Lesson> {
  @Input() teaches: Teaches;

  public submitForm (formData: any) {
    this.onSubmit.next({
      ...formData,
      date: this.getDateFromNgbDateModel(formData.date)
    } as Lesson);
  }


  public isLection () {
    return Number(this.formGroup.controls['type'].value) === Lesson.TYPE_LECTURE;
  }


  protected dateValidator () {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!this.formGroup) return;

      const startDate = this.teaches.semester.startDate;
      const endDate   = this.teaches.semester.endDate;

      const date = this.getDateFromNgbDateModel(this.formGroup.controls.date.value);
      console.log(startDate, endDate, date);

      if (date < startDate || date > endDate) {
        return {'dateOverflow': {value: control.value}};
      }

      return;
    };
  }


  protected initForm () {
    this.formGroup = this.fB.group({
      'date': [
        this.model ? this.getNgbDateModelFromDate(this.model.date) : '',
        [Validators.required, this.dateValidator()]
      ],
      'type': [
        this.model ? this.model.type : Lesson.TYPE_LECTURE
      ],
      'weight': [
        this.model ? this.model.weight : 1,
        Validators.required
      ],
      'minGradeValue': [
        this.model ? this.model.minGradeValue : 3,
        Validators.required
      ],
      'maxGradeValue': [
        this.model ? this.model.maxGradeValue : 5,
        Validators.required
      ],
      'description': [
        this.model ? this.model.description : ''
      ]
    });
  }


  protected initFormErrors () {
    this.formErrors = {
      'required': 'Поле обязательно к заполнению',
      'date': {
        'dateOverflow': 'Дата занятия не должна выходить за рамки семестра.'
      }
    };
  }


}
