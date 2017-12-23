import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const GUARDS = [
  AuthGuard,
  AdminGuard,
];

export {
  GUARDS,

  AuthGuard,
  AdminGuard,
};