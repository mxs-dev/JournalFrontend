import { Component, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

import { BaseReactiveFormComponent } from '../../../../_shared/base-components/base-reactive-form.component';
import { AcademicYear } from '../../../../_shared/models';

import { Subject } from 'rxjs';



@Component({
  selector: 'app-academic-year-form',
  templateUrl: 'academic_year-form.component.html',
  styles: [`
  `]
})
export class AcademicYearFormComponent extends BaseReactiveFormComponent<AcademicYear> {

  public submitForm (result: any) {
    this.onSubmit.next({
      title: `${result.startDate.year}-${result.endDate.year}`,
      startDate: this.getDateFromNgbDateModel(result.startDate),
      endDate: this.getDateFromNgbDateModel(result.endDate)
    } as AcademicYear);
  }


  public dateValidator () {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!this.formGroup) return;

      const startDate = this.getDateFromNgbDateModel(this.formGroup.controls.startDate.value);
      const endDate = this.getDateFromNgbDateModel(this.formGroup.controls.endDate.value);

      if (startDate >= endDate) {
        return {'dateOverflow' : {value: control.value}};
      }

      return null;
    };
  }


  protected initForm () {
    this.formGroup = this.fB.group({
      'startDate': [
        this.model ? this.getNgbDateModelFromDate(this.model.startDate) : {} ,
        [Validators.required, this.dateValidator()]
      ],
      'endDate': [
        this.model ? this.getNgbDateModelFromDate(this.model.endDate) : {},
        [Validators.required, this.dateValidator()]
      ]
    });
  }


  protected initFormErrors () {
    this.formErrors = {
      'required': 'Поле обязательно к заполнению',
      'startDate': {
        message: 'Дата начала не может быть больше даты окончания.'
      },
      'endDate' : {
        message: 'Дата окончания не может быть меньше даты начала.'
      }
    };
  }


}
