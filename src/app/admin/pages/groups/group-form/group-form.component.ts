import { Component, OnInit, OnDestroy, Input, Output  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Group } from '../../../../_shared/models/index';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styles: [`
  `]
})
export class GroupFormComponent implements OnInit, OnDestroy {
  @Input() group: Group;
  @Input() isSubmitted: boolean;
  @Input() serverFormErrors: any;

  @Output() onSubmit = new Subject<any>();

  public formGroup: FormGroup;
  public formErrors: any;

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private fB: FormBuilder,
  ) {}


  public ngOnInit () {
    this.formGroup = this.fB.group({
      title: [this.group ? this.group.title : '', Validators.compose([Validators.required, Validators.minLength(4)])],
    });

    this.formErrors = {
      title: {
        message: 'Название должно содержать не менее 4х символов.'
      }
    };
  }


  public isValid (field: string): boolean {
    if (!this.formGroup.controls[field].touched) {
      return true;
    }
      
    return this.formGroup.controls[field].valid;
  }
  

  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
} 
