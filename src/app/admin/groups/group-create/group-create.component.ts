import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Group } from '../../../_models/index';
import { GroupService } from '../../../_services/index';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-create',
  templateUrl: 'group-create.component.html',
  styleUrls: ['group-create.component.scss']
})
export class GroupCreateComponent implements OnInit, OnDestroy {
  public toggled = false;
  public groupForm: FormGroup;
  public formErrors: any;
  public isSubmitted: boolean;

  protected componentDestroyed = new Subject;


  public constructor (
    private groupService: GroupService,
    private formBuilder: FormBuilder
  ) {}


  public ngOnInit () {
    this.isSubmitted = false;

    this.groupForm = this.formBuilder.group({
      title: ['', Validators.minLength(4)]
    });

    this.formErrors = {
      title: {
        message: 'Название должно содержать не менее 4х символов.'
      }
    };
  }


  public onSubmit (elementValues: any) {
    this.isSubmitted = true;
    this.groupService.create(elementValues.title)
      .then (res => {
        console.log(res);
        this.groupForm.reset();
        this.isSubmitted = false;
      })
      .catch(err => console.log(err));
  }


  private isValid (field: string): boolean {
   
    if (!this.groupForm.controls[field].touched) {
      return true;
    }
      
    return this.groupForm.controls[field].valid;
  }


  public ngOnDestroy () {
    this.componentDestroyed.next(true);
    this.componentDestroyed.unsubscribe();
  }
}
