export class Group {

  public id: number;
  public title: string;
  public course: number;
  public createdAt: number;
  public createdBy: number;
  public updatedAt: number;
  public updatedBy: number;

  public deleted?: boolean;


  public constructor (data: any) {
    this.id        = data.id;
    this.title     = data.title;
    this.course    = data.course;
    this.createdAt = data.createdAt;
    this.createdBy = data.createdBy;

    this.deleted = false;
  }

}
