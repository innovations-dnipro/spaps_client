import { ERole } from '@spaps/enums';

export const ProtectedRoute: { [key: string]: ERole[] } = {
  '/owners-office': [ERole.RENTOR],
  '/password-change': [ERole.CLIENT, ERole.RENTOR],
  '/profile': [ERole.CLIENT],
  '/profile-rentor': [ERole.RENTOR],
  '/rentor-complex-edit': [ERole.RENTOR],
};

export const NonLoggedInRoutes: string[] = ['/login', '/registration'];
