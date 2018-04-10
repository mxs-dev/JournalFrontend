import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Student } from '../../../../../_models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-students-list',
  templateUrl: 'g-students-list.component.html',
  styles: [`
  `]
}) 
export class GroupStudentsListComponent implements OnInit, OnDestroy {
  @Input()  students: Student;
  @Output() onDelete = new Subject<Student>();

  public constructor () { }


  public ngOnInit() {

  }


  public ngOnDestroy() {
    
  }
} 
