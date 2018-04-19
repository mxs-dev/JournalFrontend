import { AcademicYear } from './academic-year.model';

export class Semester {
  public id:        number;
  public yearId:    number;
  public number:    number;
  public startDate: number;
  public endDate:   number;
  public createdAt: number;
  public createdBy: number;
  public updatedAt: number;
  public updatedBy: number;

  public constructor (data) {
    this.id        = data.id;
    this.yearId    = data.yearId;
    this.number    = data.number;
    this.startDate = data.startDate;
    this.endDate   = data.endDate;
    this.createdAt = data.createdAt;
    this.createdBy = data.createdBy;
    this.updatedAt = data.updatedAt;
    this.updatedBy = data.updatedBy;
  }
}
