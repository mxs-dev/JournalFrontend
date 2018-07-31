import { Component, EventEmitter, Output, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

import { BaseReactiveFormComponent } from '../../../_shared/base-components/base-reactive-form.component';
import { Grade } from '../../../_shared/models';


@Component({
  selector: 'app-grade-form',
  templateUrl: 'grade-form.component.html'
})
export class GradeFormComponent extends BaseReactiveFormComponent<Grade> implements OnChanges {

  @Output() onSubmit = new EventEmitter<Grade>();
  @Output() onCancel = new EventEmitter<void>();

  public initForm () {
    this.formGroup = this.fB.group({
      'value': new FormControl({
        value: this.model ? this.model.value : '',
         disabled: this.isAttend()
        }, this.validateValue()
      ),
      'attendance': [this.model ? this.model.attendance : 1],
    });
  }


  public validateValue () {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!this.formGroup) return;
      if (!this.isAttend()) return;

      const value = Number(this.formGroup.controls['value'].value);

      if (value < 0 || value > this.model.lesson.maxGradeValue) {
        return {'value-false': {value: control.value}};
      }

      return;
    };
  }


  public ngOnChanges () {
    if (this.formGroup && this.formGroup.controls['attendance'].value <= 0) {
      this.formGroup.controls['value'].setValue(0);
    }
  }


  public isAttend () {
    return this.formGroup && this.formGroup.controls['attendance'].value > 0;
  }


  public initFormErrors () { }
}
