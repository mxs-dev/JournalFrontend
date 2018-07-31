import { AcademicYear } from './academic-year.model';
import { BaseModel } from './base.model';
import { Teaches } from './teaches.model';


export class Semester extends BaseModel {

  public static readonly EF_ACADEMIC_YEAR = 'academic_year';


  public yearId:    number;
  public number:    number;
  public startDate: Date;
  public endDate:   Date;

  public academicYear ?: AcademicYear;
  public teaches      ?: Teaches[];

  public constructor (data) {
    super(data);

    this.yearId    = data.yearId;
    this.number    = data.number;
    this.startDate = new Date(data.startDate + ' 00:00:00');
    this.endDate   = new Date(data.endDate + ' 00:00:00');

    this.createEFAttributes(data);
  }

  public createEFAttributes (data) {
    if (data.academicYear) {
      this.academicYear = new AcademicYear(data.academicYear);
    }

    if (data.teaches) {
      this.teaches = [];
      data.teaches.forEach(teachesData => this.teaches.push(new Teaches(teachesData)));
    }
  }
}
