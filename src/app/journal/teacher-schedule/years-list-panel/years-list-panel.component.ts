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
    i{
      font-size: 40px;
      cursor: pointer;
    }
  `]
})
export class YearsListComponent implements OnInit, OnDestroy {

  @Input() years: AcademicYear[];
  @Input() semesterIdFromUrlStringToSelect: number;
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

    if (this.semesterIdFromUrlStringToSelect) {
      this.years.forEach(year => {
        year.semesters.forEach(semester => {
          if (semester.id === this.semesterIdFromUrlStringToSelect) {
            this.selectYear(year);
            this.selectSemester(semester);
          }
        });
      });
    } else {
      this.years.forEach(year => {
        if (year.semesters.length > 0) {
          this.selectYear(year);
          this.selectSemester(year.semesters[0]);
        }
      });
    }


  }


  public ngOnDestroy () {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}

