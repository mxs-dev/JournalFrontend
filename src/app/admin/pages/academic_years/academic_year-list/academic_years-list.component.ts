import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { AcademicYearService } from '../../../../_shared/services';
import { AcademicYear } from '../../../../_shared/models';
import { Pager } from '../../../../_shared/pagination/pager';

import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-academic-year-list',
  templateUrl: 'academic_years-list.component.html'
})
export class AcademicYearsListComponent implements OnInit, OnDestroy {
  protected readonly PAGE_SIZE = 7;

  @ViewChild('acYearSearch', {read: ElementRef}) yearSearchInput: ElementRef;

  public isLoading = false;
  public pager: Pager;

  protected allAcademicYears: AcademicYear[];
  protected componentDestroyed = new Subject<void>();


  public constructor (
    private yearService: AcademicYearService,
  ) {
    this.pager = new Pager([], 1, this.PAGE_SIZE);
  }
  

  public ngOnInit () {
    this.loadAllAcademicYears();
    this.subscribeToAcademicYearEvents();

    Observable.fromEvent(this.yearSearchInput.nativeElement, 'keyup')
      .takeUntil(this.componentDestroyed)
      .subscribe(this.search.bind(this));
  }


  public search () {
    const searchingString = this.yearSearchInput.nativeElement.value;
    let re: RegExp;

    try {
      re = new RegExp(searchingString, 'i');
    } catch (e) { console.log(e); }

    this.pager.setItems(this.allAcademicYears.filter((year) => {
      return year.title.search(re) >= 0;
    }));
  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }


  protected async loadAllAcademicYears () {
    this.isLoading = true;

    try {
      this.allAcademicYears = await this.yearService.getAll();
      this.pager.setItems(this.allAcademicYears);

      console.log(this.allAcademicYears);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = false;
    }
  }


  protected addAcademicYearToTheList (year: AcademicYear): void {
    this.allAcademicYears = [year, ...this.allAcademicYears];
    this.pager.setItems(this.allAcademicYears);
  }


  protected removeAcademicYearFromTheList (year: AcademicYear): void {
    this.allAcademicYears = this.allAcademicYears.filter((item) => {
      return year.id !== item.id;
    });
    
    this.pager.setItems(this.allAcademicYears);
  }


  protected subscribeToAcademicYearEvents (): void {
    this.yearService.events.created
      .takeUntil(this.componentDestroyed)
      .subscribe(this.addAcademicYearToTheList.bind(this));
    
    this.yearService.events.deleted
      .takeUntil(this.componentDestroyed)
      .subscribe(this.removeAcademicYearFromTheList.bind(this));
  }
}
