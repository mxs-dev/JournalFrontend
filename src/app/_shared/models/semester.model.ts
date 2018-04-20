import { AcademicYear } from './academic-year.model';
import { BaseModel } from './base.model';


export class Semester extends BaseModel {

  public yearId:    number;
  public number:    number;
  public startDate: number;
  public endDate:   number;


  public constructor (data) {
    super(data);

    this.yearId    = data.yearId;
    this.number    = data.number;
    this.startDate = data.startDate;
    this.endDate   = data.endDate;
  }
}
