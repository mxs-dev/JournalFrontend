import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AcademicYearService, SubjectService, TeachesService } from '../../../_shared/services';
import { AcademicYear, Subject, Group, Semester, Teacher, Teaches } from '../../../_shared/models';
import { BaseReactiveFormComponent } from '../../../_shared/base-components/base-reactive-form.component';
import { isMoment } from 'moment';


@Component({
  selector: 'app-schedule-add',
  templateUrl: 'schedule-add.component.html',
})
export class ScheduleAddComponent implements OnInit {

  @Input() group: Group;
  @Output() onCreate = new EventEmitter<any>();

  public years:    AcademicYear[];
  public subjects: Subject[];

  public selectedYearId:     number;
  public selectedSemesterId: number;
  public selectedSubjectId:  number;
  public selectedTeacherId:  number;
  public hoursCount:         number;


  public isLoading = true;


  public constructor (
    private yearService: AcademicYearService,
    private subjectService: SubjectService,
    private teachesService: TeachesService,
  ) { }


  public ngOnInit () {
    this.loadAllData();
  }


  public async send() {
    this.isLoading = true;

    try {
      const result =  await this.teachesService.create({
        semesterId: this.selectedSemesterId,
        groupId: this.group.id,
        userId: this.selectedTeacherId,
        subjectId: this.selectedSubjectId,
        hoursCount: this.hoursCount
      } as Teaches);

      this.onCreate.next(result);
      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }


  public formIsValid () {
    return this.selectedYearId && this.selectedSemesterId && this.selectedTeacherId && this.selectedSubjectId && this.hoursCount;
  }


  public getSemestersForSelectedYear () {
    const selectedYear = this.years.find(item => +item.id === +this.selectedYearId);
    return selectedYear ? selectedYear.semesters : [];
  }


  public getAllowedTeachersForSelectedSubject () {
    const selectedSubject = this.subjects.find(item => +item.id === +this.selectedSubjectId);
    return selectedSubject ? selectedSubject.allowedTeachers : [];
  }


  protected async loadAllData () {
    this.isLoading = true;

    try {
      this.years    = await this.yearService.getAll([AcademicYear.EF_SEMESTERS]);
      this.subjects = await this.subjectService.getAll([Subject.EF_ALLOWED_TEACHERS]);
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }

    console.log(this.years, this.subjects);
  }

}
