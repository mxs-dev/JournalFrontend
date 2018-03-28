import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';

import { StudentService, GroupService } from '../../../../_services';
import { User, Group } from '../../../../_models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-add-student',
  templateUrl: 'g-student-add.component.html',
  styles: [`
  `]
})
export class GroupStudentAddComponent {
  @Output() onCreate = new Subject<User>();
  @Output() onSelect = new Subject<User>();
  @Input()  group: Group;

  public searchedStudents: User[];
  public isSubmittedStudentForm: boolean;

  public toggledAddStudentBlock    = false;
  public toggledCreateStudentBlock = false;
  

  public constructor (
    private studentService: StudentService,
    private groupService: GroupService
  ) {}


  public search (data: any) {

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
}
