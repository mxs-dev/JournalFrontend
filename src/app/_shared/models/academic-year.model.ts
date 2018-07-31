import { Semester  } from './semester.model';
import { BaseModel } from './base.model';


export class AcademicYear extends BaseModel {

  public static readonly EF_SEMESTERS = 'semesters';

  public title:     string;
  public startDate: Date;
  public endDate:   Date;

  public semesters ?: Semester[];


  public constructor (data: any) {
    super(data);

    this.title     = data.title;
    this.startDate = new Date(data.startDate + ' 00:00:00');
    this.endDate   = new Date(data.endDate + ' 00:00:00');

    this.createEFAttributes(data);
  }


  public createEFAttributes (data) {
    if (data.semesters) {
      this.semesters = [];
      data.semesters.forEach(semesterData => this.semesters.push(new Semester(semesterData)));
    }
  }
}
