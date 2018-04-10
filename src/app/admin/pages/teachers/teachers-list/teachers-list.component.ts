import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { TeacherService } from '../../../../_services';
import { Teacher } from '../../../../_models';
import { Pager } from '../../../../_shared/pagination/pager';

import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-teachers-list',
  templateUrl: 'teachers-list.component.html',
  styles: [`
  `]
})
export class TeachersListComponent implements OnInit, OnDestroy {
  
  protected readonly PAGE_SIZE = 5;

  @ViewChild('teacherSearch', {read: ElementRef}) teacherSearchInput: ElementRef;

  public isLoading = false;
  public pager: Pager;

  protected allTeachers: Teacher[];

  protected componentDestroyed = new Subject<void>();


  public constructor (
    private subjectService: TeacherService,
  ) { }

  
  public ngOnInit () {
    this.loadAllTeachers();
    this.subscribeOnSubjectEvents();

    Observable.fromEvent(this.teacherSearchInput.nativeElement, 'keyup')
      .takeUntil(this.componentDestroyed)
      .subscribe(this.search.bind(this));

    this.pager = new Pager([], 1, this.PAGE_SIZE);
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  public async deleteTeacher (teacher: Teacher): Promise<void> {teacher.deleted = true;

    try {
      const result = await this.subjectService.delete(teacher);
      this.removeTeacherFromTheList(teacher);
      
    } catch (error) {
      console.log(error);
    }
  }


  protected search (): void {
    const searchingString = this.teacherSearchInput.nativeElement.value;
    let re: RegExp;

    try {
      re = new RegExp(searchingString, 'i');
    } catch (e) { console.log(e); }

    this.pager.setItems(this.allTeachers.filter((teacher) => {
      return teacher.fullName.search(re) >= 0;
    }));
  }


  protected async loadAllTeachers (): Promise<void> {
    this.isLoading = true;

    try {
      this.allTeachers = await this.subjectService.getAll();
      this.isLoading = false;

      this.pager.setItems(this.allTeachers);
    } catch (e) {
      console.log(e);
      this.isLoading = false;
    }
  }


  protected addTeacherToTheList (teacher: Teacher): void {
    this.allTeachers.push(teacher);
    this.pager.setItems(this.allTeachers);    
  }


  protected removeTeacherFromTheList (teacher: Teacher): void {
    this.allTeachers = this.allTeachers.filter((item) => {
      return teacher.id !== item.id;
    });

    this.pager.setItems(this.allTeachers);    
  }


  protected subscribeOnSubjectEvents (): void {
    this.subjectService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe(this.addTeacherToTheList.bind(this));

    this.subjectService.events.deleted
      .takeUntil(this.componentDestroyed)
      .subscribe(this.removeTeacherFromTheList.bind(this));
  }
}
