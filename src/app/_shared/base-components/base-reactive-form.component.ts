import { Injectable, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';


@Injectable()
export abstract class BaseReactiveFormComponent<T> implements OnInit, OnDestroy {

  @Output() public onSubmit = new Subject<T>();
  @Output() public onCancel = new Subject<void>();

  @Input() model: T;
  @Input() isSubmitted: boolean;
  @Input() serverErrors: any;

  public formGroup: FormGroup;
  public formErrors: any;

  protected componentDestroyed = new Subject<void>();


  protected abstract initForm(): void;
  protected abstract initFormErrors(): void;


  public constructor(
    protected fB: FormBuilder,
  ) { }


  public isValid(fieldName: string, error?: string): boolean {
    if (!this.formGroup.controls[fieldName]) return;

    if (!this.formGroup.controls[fieldName].touched) {
      return true;
    }

    return error
      ? !this.formGroup.get(fieldName).hasError(error)
      : this.formGroup.controls[fieldName].valid;
  }


  public resetForm () {
    this.initForm();
  }


  public ngOnInit() {
    this.initForm();
    this.initFormErrors();
  }


  public ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }



  protected getNgbDateModelFromDate(date: Date): NgbDateStruct {
    return (date && date.getFullYear) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
  }


  protected getDateFromNgbDateModel(dateStruct: NgbDateStruct): Date {
    return dateStruct ? new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day) : null;
  }
}
