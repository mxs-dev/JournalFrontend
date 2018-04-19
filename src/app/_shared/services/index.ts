import { GlobalService  } from './global.service';
import { AlertService   } from './alert.service';
import { AuthService    } from './auth.service';
import { ApiService     } from './api.service';

import { UserService    } from './user.service';
import { GroupService   } from './group.service';
import { StudentService } from './student.service';
import { SubjectService } from './subject.service';
import { TeacherService } from './teacher.service';
import { AcademicYearService } from './academic-year.service';


const SERVICES = [
  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService,
  SubjectService,
  TeacherService,
  AlertService,
  AcademicYearService,
];

export {
  SERVICES,

  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService,
  SubjectService,
  TeacherService,
  AlertService,
  AcademicYearService
};
