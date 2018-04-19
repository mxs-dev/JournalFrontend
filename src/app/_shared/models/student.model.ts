import { User } from './user.model';
import { Group } from './group.model';

export class Student extends User {

  static readonly EXTRA_FIELD_GROUP = 'group';

  public group: Group | boolean = false; 

  public constructor (data: any) {
    super(data);

    this.group = data.group || null;
  }
}
