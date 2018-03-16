import { IApiData } from './i.api-data';
import { iJWT } from './i.jwt';
import { User } from './user';
import { Group } from './group';

const MODELS = [
  User,
  Group,
];

export {
  MODELS,

  IApiData,
  iJWT,
  User,
  Group
};
