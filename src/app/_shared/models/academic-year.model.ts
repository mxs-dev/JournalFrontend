import { Semester } from './semester.model';

export class AcademicYear {

  public static readonly EXTRA_FIELDS_SEMESTERS = 'semesters';

  public id: number;
  public title: string;
  public startDate: number;
  public endDate: number;

  public semesters ?: Semester[];

  
  public constructor (data: any) {
    this.id        = data.id;
    this.title     = data.title;
    this.startDate = data.startDate;
    this.endDate   = data.endDate;

    this.semesters = data.semesters || null;
  }
} 
