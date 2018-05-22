import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

import { BaseReactiveFormComponent } from '../../_shared/base-components/base-reactive-form.component';


@Component({
  selector: 'app-confirm-registration-form',
  template: `
    <form *ngIf="!isSubmitted" [formGroup]="formGroup" (ngSubmit)="onSubmit.next(formGroup.value)">
      <div class="form-group">
        <label class="form-label">Введите пароль<span class="form-required">*</span></label>
        <input class="form-control" type="password" formControlName="password" [ngClass]="{'is-invalid': !isValid('password')}">
        <div [hidden]="isValid('password', 'required')" class="invalid-feedback">{{ formErrors.required }}</div>
        <div [hidden]="isValid('password', 'minlength')" class="invalid-feedback">{{ formErrors.password.minLength }}</div>
      </div>
      <div class="form-group">
        <label class="form-label">Введите пароль повторно<span class="form-required">*</span></label>
        <input class="form-control" type="password" formControlName="password-repeat" [ngClass]="{'is-invalid': !isValid('password-repeat')}">
        <div [hidden]="isValid('password', 'required')" class="invalid-feedback">{{ formErrors.required }}</div>
        <div [hidden]="isValid('password-repeat', 'mismatch')" class="invalid-feedback">{{ formErrors['password-repeat'].mismatch }}</div>
      </div>
      <div class="form-group d-flex justify-content-between">
        <button [disabled]="! formGroup.valid" class="btn btn-sm btn-outline-success" type="submit">Сохранить</button>
        <button class="btn btn-sm btn-outline-warning" (click)="onCancel.next()" type="reset" >Отменить</button>
      </div>
    </form>

    <div *ngIf="isSubmitted" class="d-flex justify-content-center p-3">
      <div class="loader"></div>
    </div>
  `
})
export class ConfirmRegistrationFormComponent extends BaseReactiveFormComponent<{}> {

  @Output() onSubmit = new EventEmitter<{}>();
  @Output() onCancel = new EventEmitter<void>();


  public initForm() {
    this.formGroup = this.fB.group({
      'password': ['', [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
      'password-repeat': ['', [
          Validators.required,
          this.passwordRepeatValidator()
        ]
      ]
    });
  }

  public initFormErrors () {
    this.formErrors = {
      'required': 'Поле обязательно для заполнения.',
      'password': {
        'minLength': 'Пароль должен состоять минимум из 6 символов'
      },
      'password-repeat': {
        'mismatch': 'Пароли не совпадают'
      }
    };
  }


  protected passwordRepeatValidator () {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!this.formGroup) return;

      const password = this.formGroup.controls['password'].value;
      const p_Repeat = this.formGroup.controls['password-repeat'].value;

      if (password !== p_Repeat) {
        return {'mismatch': {value: control.value}};
      }

      return;
    };
  }
}
