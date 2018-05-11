import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { AcademicYear, Semester } from '../../../_shared/models';

import { Subject } from 'rxjs';
import {  } from 'protractor';



@Component({
  selector: 'app-years-list',
  templateUrl: 'years-list-panel.component.html',
  styles: [`
    .badge {
      cursor: pointer;
    }
    .selected {
      background-color: #007bff26;
      border-color: #007bff26;
    }
    img{
      height: 20px;
      cursor: pointer;
    }
  `]
})
export class YearsListComponent implements OnInit, OnDestroy {

  @Input() years: AcademicYear[];
  @Output() onSelect = new EventEmitter<Semester>();

  public selectedYear:     AcademicYear;
  public selectedSemester: Semester;

  protected componentDestroyed = new Subject<void>();

  public constructor () {}


  public selectYear(year: AcademicYear) {
    if (this.selectedYear && this.selectedYear.id === year.id) {
      return;
    }

    this.selectedYear = year;
    this.selectedSemester = null;
  }


  public selectSemester (semester: Semester) {
    this.selectedSemester = semester;

    this.onSelect.next(semester);
  }


  public ngOnInit () {

  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}

