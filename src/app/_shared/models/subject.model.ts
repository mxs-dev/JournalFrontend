import { BaseModel } from './base.model';


export class Subject extends BaseModel {

  public title:       string;
  public description: string;


  public constructor (data: any) {
    super(data);
    
    this.title       = data.title;
    this.description = data.description;
  }
}
