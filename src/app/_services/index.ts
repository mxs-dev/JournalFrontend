import { GlobalService  } from './global.service';
import { AuthService    } from './auth.service';
import { UserService    } from './user.service';
import { ApiService     } from './api.service';
import { GroupService   } from './group.service';
import { StudentService } from './student.service';


const SERVICES = [
  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService
];

export {
  SERVICES,

  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
  StudentService
};
