import { BaseModel } from './base.model';


export class Group extends BaseModel {

  public title: string;
  public course: number;


  public constructor (data: any) {
    super(data);

    this.title     = data.title;
    this.course    = data.course;
  }
}
