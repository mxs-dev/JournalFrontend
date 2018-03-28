import { GlobalService  } from './global.service';
import { AuthService    } from './auth.service';
import { ApiService     } from './api.service';
import { PagerService   } from './pager.service';

import { UserService    } from './user.service';
import { GroupService   } from './group.service';
import { StudentService } from './student.service';


const SERVICES = [
  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService,
  PagerService
];

export {
  SERVICES,

  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService,
  PagerService
};
