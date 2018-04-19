import { GlobalService  } from './global.service';
import { AlertService   } from './alert.service';
import { AuthService    } from './auth.service';
import { ApiService     } from './api.service';

import { UserService    } from './user.service';
import { GroupService   } from './group.service';
import { StudentService } from './student.service';
import { SubjectService } from './subject.service';
import { TeacherService } from './teacher.service';



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
  AlertService
};
