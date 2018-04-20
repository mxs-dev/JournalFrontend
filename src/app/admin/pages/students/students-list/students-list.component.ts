import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { Student, ApiError } from '../../../../_shared/models';
import { StudentService } from '../../../../_shared/services';
import { Pager } from '../../../../_shared/pagination/pager';

import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-students-list',
  templateUrl: 'students-list.component.html',
  styleUrls: ['students-list.component.scss']
})
export class StudentsListComponent implements OnInit, OnDestroy {
  
  private readonly PAGE_SIZE = 5;

  @ViewChild('studentSearch', {read: ElementRef}) studentSearchInput: ElementRef;

  public students: Student[];

  public isLoadingStudentsList = false;

  public pager: Pager;

  

  protected componentDestroyed = new Subject<any>();


  public constructor (
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) { }


  public async ngOnInit () {
    this.loadAllStudents();

    this.pager = new Pager([], 1, this.PAGE_SIZE);

    this.subscribeToStudentServiceEvents();

    Observable.fromEvent(this.studentSearchInput.nativeElement, 'keyup')
      .takeUntil(this.componentDestroyed)
      .debounceTime(100)
      .subscribe(this.search.bind(this));
  }


  public async deleteStudent(student: Student) {
    student._deleted = true;

    try {
      const result = await this.studentService.delete(student);
      this.removeStudentFromList(student);

    } catch (e) {
      const error = <ApiError> e;
      console.log(error);
    }
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
  

  protected search () {
    const searchString = this.studentSearchInput.nativeElement.value;

    this.pager.setItems(this.students.filter((student: Student) => {
      return student.fullName.search(new RegExp(searchString, 'i')) >= 0;
    }));
  }


  protected async loadAllStudents () {
    this.isLoadingStudentsList = true;

    try {
      this.students = await this.studentService.getAll([Student.EXTRA_FIELD_GROUP]);

      this.pager.setItems(this.students);
      this.isLoadingStudentsList = false;
    
    } catch (e) {
      const error = <ApiError> e;
      console.log('StudentList got error', error);
      this.isLoadingStudentsList = false;
    }
  }


  protected subscribeToStudentServiceEvents () {
    this.studentService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe(this.addStudentToTheList.bind(this));

    this.studentService.events.deleted
      .takeUntil(this.componentDestroyed)
      .subscribe(this.removeStudentFromList.bind(this));
  }


  protected addStudentToTheList (student: Student) {
    this.students.push(student);
  }


  protected removeStudentFromList (student: Student): void {
    this.students = this.students.filter(item => item.id !== student.id);
  }
}
