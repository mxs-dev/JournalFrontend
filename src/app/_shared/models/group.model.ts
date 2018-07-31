import { BaseModel    } from './base.model';
import { Student      } from './student.model';
import { Teaches      } from './teaches.model';
import { AcademicYear } from './academic-year.model';


export class Group extends BaseModel {

  public static readonly EF_STUDENTS = 'students';
  public static readonly EF_TEACHES_SUBJECT_TEACHER  = 'teaches.subject,teaches.teacher';
  public static readonly EF_STUDYING_YEARS = 'studyingYears';

  public title: string;
  public course: number;

  public students        ?: Student[];
  public teaches         ?: Teaches[];
  public studyingYears   ?: AcademicYear[];


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

    if (data.teaches) {
      this.teaches = [];
      data.teaches.forEach(teachesData => this.teaches.push(new Teaches(teachesData)));
    }

    if (data.studyingYears) {
      this.studyingYears = [];
      data.studyingYears.forEach(yearData => this.studyingYears.push(new AcademicYear(yearData)));
    }
  }
}
