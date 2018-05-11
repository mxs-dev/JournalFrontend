import { User         } from './user.model';
import { Subject      } from './subject.model';
import { AcademicYear } from './academic-year.model';

export class Teacher extends User {

  static readonly EXTRA_FIELD_ASSIGNED_SUBJECTS = 'assignedSubjects';
  static readonly EF_TEACHING_YEARS = 'teachingYears';


  public assignedSubjects ?: Subject[];
  public teachingYears    ?: AcademicYear[];

  public constructor (data: any) {
    super(data);

    this.assignedSubjects = data.assignedSubjects || null;
    this.teachingYears = data.teachingYears || null;
  }
}
