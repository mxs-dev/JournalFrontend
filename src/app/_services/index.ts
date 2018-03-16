import { GlobalService } from './global.service';
import { AuthService   } from './auth.service';
import { UserService   } from './user.service';
import { ApiService    } from './api.service';
import { GroupService  } from './group.service';


const SERVICES = [
  GlobalService,
  UserService,
  AuthService,
  ApiService,
  GroupService,
];

export {
  SERVICES,

  GlobalService,
  UserService,
  AuthService,
  ApiService,
};
