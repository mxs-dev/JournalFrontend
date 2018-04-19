import { User } from './user.model';
import { Subject } from './subject.model';

export class Teacher extends User {

  static readonly EXTRA_FIELD_ASSIGNED_SUBJECTS = 'assignedSubjects';

  public assignedSubjects ?: Subject[];

  public constructor (data: any) {
    super(data);

    this.assignedSubjects = data.assignedSubjects || null;
  }
}
