import { BaseModel } from './base.model';
import { Teacher   } from './teacher.model';
import { Group     } from './group.model';
import { Subject   } from './subject.model';


export class Teaches extends BaseModel {
  public userId:    number;
  public subjectId: number;
  public groupId:   number;

  public teacher ?: Teacher;
  public lessons ?: any;
  public group   ?: Group;
  public subject ?: Subject;

  public constructor (data: any) {
    super(data);
    this.userId    = data.userId;
    this.groupId   = data.groupId;
    this.subjectId = data.subjectId;

    this.group   = data.group   || null;
    this.lessons = data.lessons || null;
    this.teacher = data.teacher || null;
    this.subject = data.subject || null;
  }
}
