import { BaseModel } from './base.model';
import { Lesson } from './lesson.model';

export class Grade extends BaseModel {

  public readonly ATTEND_YES      =  1;
  public readonly ATTEND_NO       = -1;
  public readonly ATTEND_NO_RESP  =  0;


  public userId:     number;
  public lessonId:   number;
  public attendance: number;
  public value:      number;

  public lesson: Lesson;

  public constructor (data: any) {
    super(data);

    this.userId     = data.userId;
    this.lessonId   = data.lessonId;
    this.attendance = data.attendance;
    this.value      = data.value;
  }
}
