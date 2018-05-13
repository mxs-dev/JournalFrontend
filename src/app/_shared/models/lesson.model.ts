import { BaseModel } from './base.model';
import { Subject   } from './subject.model';
import { Teaches   } from './teaches.model';
import { Grade     } from './grade.model';

export class Lesson extends BaseModel {

  public static readonly TYPE_LECTURE  = 1;
  public static readonly TYPE_PRACTICE = 2;

  public teachesId: number;
  public date: Date;
  public type: number;
  public description: string;


  public subject ?: Subject;
  public teaches ?: Teaches;
  public grades ?: Grade[];

  public constructor (data: any) {
    super(data);

    this.teachesId   = data.teachesId;
    this.date        = new Date(data.date);
    this.type        = data.type;
    this.description = data.description;

    this.subject = data.subject || null;
    this.teaches = data.teaches || null;
    this.grades  = data.grades  || null;
  }
}
