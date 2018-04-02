export class Subject {

  public id:          number;
  public title:       string;
  public description: string;
  public createdAt:   number;
  public createdBy:   number;
  public updatedAt:   number;
  public updatedBy:   number;

  public deleted ?: boolean;

  public constructor (data: any) {
    this.id          = data.id;
    this.title       = data.title;
    this.description = data.description;
    this.createdAt   = data.createdAt;
    this.createdBy   = data.createdBy;
    this.updatedAt   = data.updatedAt;
    this.updatedBy   = data.updatedBy;
  }
}
