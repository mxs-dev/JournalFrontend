import { User } from './user';
import { Subject } from './subject';

export class Teacher extends User {

  static readonly EXTRA_FIELD_ASSIGNED_SUBJECTS = 'assignedSubjects';

  public assignedSubjects ?: Subject[];

  public constructor (data: any) {
    super(data);

    this.assignedSubjects = data.assignedSubjects || null;
  }
}
