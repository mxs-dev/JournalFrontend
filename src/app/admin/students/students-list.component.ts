import { Component, OnInit, OnDestroy } from '@angular/core';

import { User, ApiError} from '../../_models';
import { StudentService } from '../../_services';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-students-list',
  templateUrl: 'students-list.component.html',
  styleUrls: ['students-list.component.scss']
})
export class StudentsListComponent implements OnInit, OnDestroy {

  public students: User[];

  public isLoadingStudentsList = false;


  protected componentDestroyed = new Subject<any>();


  public constructor (
    private studentService: StudentService
  ) { }


  public ngOnInit () {
    this.isLoadingStudentsList = true;

    this.studentService.getAll()
      .then((students: User[]) => {
        this.students = students;
        this.isLoadingStudentsList = false;
      })  
      .catch((err: ApiError) => {
        console.log('StudentList got error', err);
        this.isLoadingStudentsList = false;
      });

    this.studentService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe((student: User) => {
        this.students.push(student);
    });

    this.studentService.events.deleted
      .takeUntil(this.componentDestroyed)
      .subscribe((id: number) => {
        this.students = this.students.filter((s) => s.id !== id);
    });
  }


  public deleteStudent(student: User) {
    student.deleted = true;

    this.studentService.delete(student.id).catch(err => console.log(err));
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
  
}
