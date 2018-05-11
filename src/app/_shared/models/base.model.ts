import { User } from './user.model';

export abstract class BaseModel {

  public static readonly EF_CREATED_BY_USER = 'createdByUser';

  public id?: number;
  public createdAt: Date;
  public updatedAt: Date;
  public createdBy: number;
  public updatedBy: number;

  public _deleted  ?: boolean;
  public _selected ?: boolean;

  public createdByUser ?: User;

  public constructor(data: any) {
    this._deleted = false;
    this._selected = false;

    this.id        = data.id;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);


    this.createdBy     = data.createdBy;
    this.updatedBy     = data.updatedBy;
    this.createdByUser = data.createdByUser || null;
  }
}
