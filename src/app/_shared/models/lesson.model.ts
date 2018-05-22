import { BaseModel } from './base.model';
import { Subject   } from './subject.model';
import { Teaches   } from './teaches.model';
import { Grade     } from './grade.model';
import { TeachesService } from '../services';

export class Lesson extends BaseModel {

  public static readonly EF_GRADES = 'grades';

  public static readonly TYPE_LECTURE  = 1;
  public static readonly TYPE_PRACTICE = 2;

  public teachesId: number;
  public date: Date;
  public type: number;
  public description: string;

  public minGradeValue: number;
  public maxGradeValue: number;

  public subject ?: Subject;
  public grades  ?: Grade[];


  public constructor (data: any) {
    super(data);

    this.teachesId     = data.teachesId;
    this.date          = new Date(data.date);
    this.type          = data.type;
    this.description   = data.description;
    this.minGradeValue = data.minGradeValue;
    this.maxGradeValue = data.maxGradeValue;

    this.createEFAttributes(data);
  }


  protected createEFAttributes (data) {
    if (data.subject) {
      this.subject = new Subject(data);
    }

    if (data.grades) {
      this.grades = [];
      data.grades.forEach(gradeData => this.grades.push(new Grade(gradeData)));
    }
  }
}
