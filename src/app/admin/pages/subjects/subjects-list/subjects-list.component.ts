import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { SubjectService } from '../../../../_shared/services';
import { Pager          } from '../../../../_shared/pagination/pager';
import { Subject        } from '../../../../_shared/models';

import { Observable, Subject as rxSubject } from 'rxjs';


@Component({
  selector: 'app-subjects-list',
  templateUrl: 'subjects-list.component.html',
  styles: [`
    .cart-body{
      flex: 1;
    }
  `]
})
export class SubjectsListComponent implements OnInit, OnDestroy {
  
  protected readonly PAGE_SIZE = 5;

  @ViewChild('subjectSearch', {read: ElementRef}) subjectSearchInput: ElementRef;

  public isLoadingSubjects = false;
  public pager: Pager;

  protected allSubjects: Subject[];

  protected componentDestroyed = new rxSubject<void>();


  public constructor (
    private subjectService: SubjectService,
  ) { }

  
  public ngOnInit () {
    this.loadAllSubjects();
    this.subscribeOnSubjectEvents();

    Observable.fromEvent(this.subjectSearchInput.nativeElement, 'keyup')
      .takeUntil(this.componentDestroyed)
      .subscribe(this.search.bind(this));

    this.pager = new Pager([], 1, this.PAGE_SIZE);
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  public async deleteSubject (subject: Subject): Promise<void> {
    subject._deleted = true;

    try {
      await this.subjectService.delete(subject);
      this.removeSubjectFromTheList(subject);
      
    } catch (error) {
      console.log(error);
    }
  }


  protected search (): void {
    const searchingString = this.subjectSearchInput.nativeElement.value;
    let re: RegExp;

    try {
      re = new RegExp(searchingString, 'i');
    } catch (e) { console.log(e); }

    this.pager.setItems(this.allSubjects.filter((subject) => {
      return subject.title.search(re) >= 0;
    }));
  }


  protected async loadAllSubjects (): Promise<void> {
    this.isLoadingSubjects = true;

    try {
      this.allSubjects = await this.subjectService.getAll();
      this.isLoadingSubjects = false;

      this.pager.setItems(this.allSubjects);
    } catch (e) {
      console.log(e);
      this.isLoadingSubjects = false;
    }
  }


  protected addSubjectToTheList (subject: Subject): void {
    this.allSubjects.push(subject);
    this.pager.setItems(this.allSubjects);    
  }


  protected removeSubjectFromTheList (subject: Subject): void {
    this.allSubjects = this.allSubjects.filter((item) => {
      return subject.id !== item.id;
    });

    this.pager.setItems(this.allSubjects);    
  }


  protected subscribeOnSubjectEvents (): void {
    this.subjectService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe(this.addSubjectToTheList.bind(this));

    this.subjectService.events.deleted
      .takeUntil(this.componentDestroyed)
      .subscribe(this.removeSubjectFromTheList.bind(this));
  }
}
