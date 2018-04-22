import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { StudentService, GroupService } from '../../../../../_shared/services';
import { Student, Group } from '../../../../../_shared/models';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-group-add-student',
  templateUrl: 'g-student-add.component.html',
  styles: [`
    .searched-students {
      max-height: 400px;
      overflow-x: hidden;
      overflow-y: hidden;
    }
  `] 
})
export class GroupStudentAddComponent implements OnInit, OnDestroy {
  @Output() onCreate = new Subject<Student>();
  @Output() onSelect = new Subject<Student>();
  @Input()  group: Group;

  public searchedStudents: Student[];

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

    this.studentService.search(data, true)
      .then((students: Student[]) => {
        this.searchedStudents = students;

        this.isSubmittedStudentSearch = false;
      })
      .catch((err) => {
        console.log(err);
        this.isSubmittedStudentSearch = false;
      });
  }


  public async addStudent (student: Student) {
    student._deleted = true;

    try {
      const result = await this.groupService.addStudent(this.group.id, student.id);

      if (result) {
        this.removeStudentFromSearchedStudents(student);
        this.onSelect.next(student);
        student._deleted = false;
      }

    } catch (error) {
      console.log(error);
    }
  }


  public createStudent (data: Student) {
    this.studentService.create(data)
      .then((student: Student) => {
        this.groupService.addStudent(this.group.id, student.id)
          .then((res: boolean) => {
            this.onCreate.next(student);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected removeStudentFromSearchedStudents (student: Student): void {
    this.searchedStudents = this.searchedStudents.filter((item) => {
      return item.id !== student.id;
    });
  }
}
