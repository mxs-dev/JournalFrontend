import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

import { BaseReactiveFormComponent } from '../../../../_shared/base-components/base-reactive-form.component';
import { Semester, AcademicYear } from '../../../../_shared/models';


@Component({
  selector: 'app-semester-form',
  templateUrl: 'semester-form.component.html',
  styles: [``]
})
export class SemesterFormComponent extends BaseReactiveFormComponent<Semester> {

  @Input() academicYear: AcademicYear;


  public submitForm (formData: any) {
    this.onSubmit.next({
      number:    formData.number,
      startDate: this.getDateFromNgbDateModel(formData.startDate),
      endDate:   this.getDateFromNgbDateModel(formData.endDate)
    } as Semester);
  }


  public startDateValidator () {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!this.formGroup) return;

      const startDate = this.getDateFromNgbDateModel(this.formGroup.controls.startDate.value);
      const endDate   = this.getDateFromNgbDateModel(this.formGroup.controls.endDate.value);

      if (startDate > endDate) {
        return {'dateOverflow': {value: control.value}};
      }

      if (startDate < this.academicYear.startDate) {
        return {'yearDateOverflow': {value: control.value}};
      }

      return null;
    };
  }


  public endDateValidator () {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!this.formGroup) return;

      const startDate = this.getDateFromNgbDateModel(this.formGroup.controls.startDate.value);
      const endDate   = this.getDateFromNgbDateModel(this.formGroup.controls.endDate.value);

      if (startDate > endDate) {
        return {'dateOverflow': {value: control.value}};
      }

      if (endDate > this.academicYear.endDate) {
        return {'yearDateOverflow': {value: control.value}};
      }

      return null;
    };
  }


  protected initForm () {
    this.formGroup = this.fB.group({
      'number': [
        this.model ? this.model.number : null ,
      ],
      'startDate': [
        this.model ? this.getNgbDateModelFromDate(this.model.startDate) : {} ,
        [Validators.required, this.startDateValidator()]
      ],
      'endDate': [
        this.model ? this.getNgbDateModelFromDate(this.model.endDate) : {},
        [Validators.required, this.endDateValidator()]
      ]
    });
  }


  protected initFormErrors () {
    this.formErrors = {
      'required': 'Поле обязательно к заполнению',
      'startDate': {
        'dateOverflow': 'Дата начала не может быть больше даты окончания.',
        'yearDateOverflow': 'Дата начала не может быть меньше даты начала учебного года.',
      },
      'endDate' : {
        'dateOverflow': 'Дата окончания не может быть меньше даты начала.',
        'yearDateOverflow': 'Дата конца не может быть больше даты конца учебного года.',
      }
    };
  }

}
