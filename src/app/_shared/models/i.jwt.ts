import { User } from './user.model';

export interface iJWT {

  /** User Id
   * @var jwi number
   */
  jti: number;

  /** Token expiration date
   * @var exp number
   */
  exp: number;

  /** Token obtaining date
   * @var iat number
   */
  iat: number;

  aud: string;
  iss: string;
  model: User;
}
