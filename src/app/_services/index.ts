import { GlobalService  } from './global.service';
import { AuthService    } from './auth.service';
import { ApiService     } from './api.service';

import { UserService    } from './user.service';
import { GroupService   } from './group.service';
import { StudentService } from './student.service';
import { SubjectService } from './subject.service';

const SERVICES = [
  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService,
  SubjectService
];

export {
  SERVICES,

  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService,
  SubjectService
};
