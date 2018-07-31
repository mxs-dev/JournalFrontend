import { BaseModel } from './base.model';
import { Teacher      } from './teacher.model';

export class Subject extends BaseModel {

  public static readonly EF_ALLOWED_TEACHERS = 'allowedTeachers';

  public title:       string;
  public description: string;
  public allowedTeachers ?: Teacher[];

  public constructor (data: any) {
    super(data);

    this.title       = data.title;
    this.description = data.description;
    this.createEFAttributes(data);
  }

  public createEFAttributes (data) {
    if (data.allowedTeachers) {
      this.allowedTeachers = [];
      data.allowedTeachers.forEach(allowedTeacherData => this.allowedTeachers.push(new Teacher(allowedTeacherData)));
    }
  }
}
