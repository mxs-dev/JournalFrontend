import { Component, ViewChild, ElementRef, Input, AfterViewInit, Output, OnInit, OnDestroy } from '@angular/core';

import { TeacherService, SubjectService } from '../../../../../_shared/services';
import { Teacher, Subject } from '../../../../../_shared/models';

import { Subject as rxSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-assigned-subject-add',
  templateUrl: 'assigned-subject-add.component.html',
  styles: [`
    .searched-subjects {
      min-height: 150px;
      max-height: 250px;
      position: relative;
    }
  `]
})
export class AssignedSubjectAddComponent implements OnInit, OnDestroy {
  
  @Input()  teacher:   Teacher;
  @Input()  isLoading: boolean;
  @Output() onSelect = new rxSubject<Subject>();

  @ViewChild('searchInput', {read: ElementRef}) searchInput: ElementRef;

  public toggled = false;
  public isLoadingSubjects: boolean;
  public isSubmitted: boolean;

  public searchedSubjects = new Array<Subject>();
  protected allSubjects: Subject[];

  protected componentDestroyed = new rxSubject<void>();


  public constructor (
    private teacherService: TeacherService,
    private subjectService: SubjectService,
  ) {}


  public ngOnInit () {
    this.loadAllSubjects();

    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .takeUntil(this.componentDestroyed)
      .debounceTime(500)
      .subscribe(this.search.bind(this));
  }


  public search () {
    const title = this.searchInput.nativeElement.value;
    let re: RegExp;

    try { re = new RegExp(title, 'i'); } catch (e) { console.log(e); }

    this.searchedSubjects = this.allSubjects.filter((subject) => {
      return subject.title.search(re) >= 0;
    });

    console.log(this.searchedSubjects);
  }


  public async addSubject (subject: Subject) {
    subject.deleted  = true;
    this.isSubmitted = true;

    try {
      await this.teacherService.addAssignedSubject(this.teacher, subject);
      this.teacher.assignedSubjects.splice(0, 0, subject);

    } catch (error) {
      console.log(error);
    
    } finally {
      this.onSelect.next(subject);
      this.removeSubjectFromTheList(subject);
      subject.deleted  = false;
      this.isSubmitted = false;
    }
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected async loadAllSubjects () {
    this.isLoadingSubjects = true;

    try {
      const result = await this.subjectService.getAll();
      this.allSubjects = this.filterSubjects(result);

      console.log(result); console.log(this.allSubjects);

    } catch (error) {
      console.log(error);
    
    } finally {
      this.isLoadingSubjects = false;
    }
  }


  protected removeSubjectFromTheList (subject) {
    this.allSubjects = this.allSubjects.filter(item => {
      return subject.id !== item.id;
    });

    this.search();
  }


  protected filterSubjects (subjects: Subject[]): Subject[] {
   const result = subjects.filter((subject: Subject) => {
      const s = this.teacher.assignedSubjects.find( (item) => {
        return item.id === subject.id;
      });

      return !s;
    });

    return result;
  }
}
