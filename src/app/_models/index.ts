import { IApiData } from './i.api-data';
import { iJWT } from './i.jwt';
import { User } from './user';
import { Group } from './group';
import { ApiError } from './api-error';

const MODELS = [
  User,
  Group,
  ApiError
];

export {
  MODELS,

  IApiData,
  iJWT,
  User,
  Group,
  ApiError
};
