import { GlobalService } from './global.service';
import { AuthService }   from './auth.service';
import { UserService }   from './user.service';
import { ApiService }    from './api.service';

const SERVICES = [
  GlobalService,
  UserService,
  AuthService,
  ApiService,
];

export {
  SERVICES,

  GlobalService,
  UserService,
  AuthService,
  ApiService,
};