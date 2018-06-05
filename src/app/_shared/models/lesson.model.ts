import { BaseModel } from './base.model';
import { Subject   } from './subject.model';
import { Teaches   } from './teaches.model';
import { Grade     } from './grade.model';
import { TeachesService } from '../services';

export class Lesson extends BaseModel {

  public static readonly EF_GRADES = 'grades';

  public static readonly TYPE_LECTURE  = 1;
  public static readonly TYPE_PRACTICE = 2;
  public static readonly TYPE_CONTROL  = 3;
  public static readonly TYPE_EXAM     = 4;
  public static readonly TYPE_TOTAL    = 99;

  public teachesId:   number;
  public date:        Date;
  public type:        number;
  public description: string;

  public weight:        number;
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
    this.weight        = data.weight;
    this.minGradeValue = data.minGradeValue;
    this.maxGradeValue = data.maxGradeValue;

    this.createEFAttributes(data);
  }


  public getTypeLabel () {
    switch (this.type) {
      case Lesson.TYPE_LECTURE:  return 'Лекция';
      case Lesson.TYPE_PRACTICE: return 'Практика';
      case Lesson.TYPE_CONTROL:  return 'КP';
      case Lesson.TYPE_EXAM:     return 'Экзамен';
      case Lesson.TYPE_TOTAL:    return 'Итоговая оценка';
    }
  }


  public getShortTypeLabel () {
    switch (this.type) {
      case Lesson.TYPE_LECTURE:  return 'Л';
      case Lesson.TYPE_PRACTICE: return 'Пр';
      case Lesson.TYPE_CONTROL:  return 'КР';
      case Lesson.TYPE_EXAM:     return 'Эк';
      case Lesson.TYPE_TOTAL:    return 'Итог';
    }
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
