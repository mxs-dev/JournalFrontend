import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { User } from '../../../../_models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-students-list',
  templateUrl: 'g-students-list.component.html',
  styles: [`
  `]
})
export class GroupStudentsListComponent implements OnInit, OnDestroy{
  @Input() students: User;
  @Output() onAdd    = new Subject<User>();
  @Output() onDelete = new Subject<User>();

  public constructor ( 
    
  ) {}


  public ngOnInit() {

  }

  public ngOnDestroy() {
    
  }
} 
