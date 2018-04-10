import { Component, ViewChild, ElementRef, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { TeacherService, SubjectService } from '../../../../../_services';
import { Teacher, Subject } from '../../../../../_models';

import { Subject as rxSubject } from 'rxjs';


@Component({
  selector: 'app-assigned-subject-add',
  templateUrl: 'assigned-subject-add.component.html',
  styles: [`
  `]
})
export class AssignedSubjectAddComponent implements OnInit, OnDestroy {
  
  @Input()  teacher: Teacher;
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

  }


  public search () {
    const title = this.searchInput.nativeElement.value;
    let re: RegExp;

    if (title.length < 0) { return; }

    try { re = new RegExp(title, 'i'); } catch (e) { console.log(e); }

    this.searchedSubjects = this.allSubjects.filter((subject) => {
      return subject.title.search(re) >= 0;
    });
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected async loadAllSubjects () {
    this.isLoadingSubjects = true;

    try {
      this.allSubjects = await this.subjectService.getAll();
      this.filterSubjects();

    } catch (error) {
      console.log(error);
    
    } finally {
      this.isLoadingSubjects = false;
    }
  }


  protected filterSubjects () {
    this.allSubjects = this.allSubjects.filter((subject: Subject) => {
      const s = this.teacher.assignedSubjects.find( (item) => {
        return item.id === subject.id;
      });

      return !!s;
    });
  }
}
