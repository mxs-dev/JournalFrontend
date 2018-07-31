import { User } from './user.model';
import { Group } from './group.model';
import { Grade } from './grade.model';
import { AcademicYear } from '.';

export class Student extends User {

  static readonly EF_GROUP  = 'group';
  static readonly EF_GRADES = 'grades';


  public group  ?: any;
  public grades ?: Grade[];

  public academicPerformance ?: AcademicYear[];

  public constructor (data: any) {
    super(data);

    this.academicPerformance = data.academicPerformance || null;

    this.createEFAttributes(data);
  }


  protected createEFAttributes (data: any) {
    if (data.group) {
      this.group = new Group(data.group);
    }

    if (data.grades) {
      this.grades = [];
      data.grades.forEach(gradeData => this.grades.push(new Grade(gradeData)));
    }

    if (data.academicPerformance) {
      this.academicPerformance = [];
      data.academicPerformance.forEach(dataItem => this.academicPerformance.push(new AcademicYear(dataItem)));
    }
  }
}
