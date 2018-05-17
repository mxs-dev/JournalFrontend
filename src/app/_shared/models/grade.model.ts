import { BaseModel } from './base.model';

export class Grade extends BaseModel {

  public userId:     number;
  public lessonId:   number;
  public attendance: boolean;
  public value:      number;

  public constructor (data: any) {
    super(data);

    this.userId     = data.userId;
    this.lessonId   = data.lessonId;
    this.attendance = data.attendance;
    this.value      = data.value;
  }
}
