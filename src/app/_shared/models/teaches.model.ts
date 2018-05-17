import { BaseModel } from './base.model';
import { Teacher   } from './teacher.model';
import { Group     } from './group.model';
import { Subject   } from './subject.model';
import { Lesson    } from './lesson.model';
import { Semester  } from './semester.model';


export class Teaches extends BaseModel {
  public static readonly EF_TEACHER  = 'teacher';
  public static readonly EF_LESSONS  = 'lessons';
  public static readonly EF_SUBJECT  = 'subject';
  public static readonly EF_GROUP    = 'group';
  public static readonly EF_SEMESTER = 'semester';
  public static readonly EF_GROUP_STUDENTS = 'group.students';
  public static readonly EF_LESSONS_GRADES = 'lessons.grades';

  public userId:    number;
  public subjectId: number;
  public groupId:   number;

  public teacher  ?: Teacher;
  public lessons  ?: Lesson[];
  public group    ?: Group;
  public subject  ?: Subject;
  public semester ?: Semester;

  public constructor (data: any) {
    super(data);
    this.userId    = data.userId;
    this.groupId   = data.groupId;
    this.subjectId = data.subjectId;

    this.createEFAttributes(data);
  }


  protected createEFAttributes (data) {
    if (data.group) {
      this.group = new Group(data.group);
    }

    if (data.lessons) {
      this.lessons = [];
      data.lessons.forEach(item => this.lessons.push(new Lesson(item)));
    }

    if (data.subject) {
      this.subject = new Subject(data.subject);
    }

    if (data.semester) {
      this.semester = new Semester(data.semester);
    }
  }
}
