import { BaseModel } from './base.model';
import { Student   } from './student.model';


export class Group extends BaseModel {

  public static readonly EF_STUDENTS = 'students';

  public title: string;
  public course: number;

  public students ?: Student[];

  public constructor (data: any) {
    super(data);

    this.title     = data.title;
    this.course    = data.course;

    this.createEFAttributes(data);
  }

  protected createEFAttributes (data) {
    if (data.students) {
      this.students = [];
      data.students.forEach(studentData => this.students.push(new Student(studentData)));
    }
  }
}
