import { IApiData } from './i.api-data';
import { iJWT } from './i.jwt';
import { ApiError } from './api-error';

import { User } from './user';
import { Group } from './group';
import { Subject } from './subject';
import { Student } from './student';



const MODELS = [
  User,
  Group,
  Subject,
  ApiError,
  Student
];

export {
  MODELS,

  IApiData,
  iJWT,
  User,
  Group,
  Subject,  
  ApiError,
  Student
};
