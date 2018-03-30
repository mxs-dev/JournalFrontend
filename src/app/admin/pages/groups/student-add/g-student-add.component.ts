import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { StudentService, GroupService } from '../../../../_services';
import { User, Group } from '../../../../_models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-add-student',
  templateUrl: 'g-student-add.component.html',
  styles: [`
    .loader{
      font-size: 7px;
    }
  `]
})
export class GroupStudentAddComponent implements OnInit, OnDestroy {
  @Output() onCreate = new Subject<User>();
  @Output() onSelect = new Subject<User>();
  @Input()  group: Group;

  public searchedStudents: User[];

  public isSubmittedStudentForm:   boolean;
  public isSubmittedStudentSearch: boolean;

  public toggledAddStudentBlock    = false;
  public toggledCreateStudentBlock = false;

  public studentSearchForm: FormGroup;
  
  protected componentDestroyed = new Subject<void>();


  public constructor (
    private studentService: StudentService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {}


  public ngOnInit () {
    this.studentSearchForm = this.fb.group({
      name: [''],
      surname: [''],
      patronymic: ['']
    });
  }


  public search (data: any) {
    this.isSubmittedStudentSearch = true;

    this.studentService.search(data)
      .then((students: User[]) => {
        this.searchedStudents = students;

        this.isSubmittedStudentSearch = false;
      })
      .catch((err) => {
        console.log(err);
        this.isSubmittedStudentSearch = false;
      });
  }


  public createStudent (data: User) {
    this.studentService.create(data)
      .then((student: User) => {
        this.groupService.addStudent(this.group.id, student.id)
          .then((res: boolean) => {

            this.onCreate.next(student);
            console.log('Student added', res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
