import { Semester  } from './semester.model';
import { BaseModel } from './base.model';


export class AcademicYear extends BaseModel {

  public static readonly EXTRA_FIELDS_SEMESTERS = 'semesters';

  public title: string;
  public startDate: number;
  public endDate: number;

  public semesters ?: Semester[];

  
  public constructor (data: any) {
    super(data);

    this.title     = data.title;
    this.startDate = data.startDate;
    this.endDate   = data.endDate;

    this.semesters = data.semesters || null;
  }
} 
