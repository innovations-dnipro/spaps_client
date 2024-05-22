import { ERole } from '@spaps/enums';

export const ProtectedRoute: { [key: string]: ERole[] } = {
  '/profile': [ERole.CLIENT],
  '/profile-rentor': [ERole.RENTOR],
};

export const NonLoggedInRoutes: string[] = ['/login', '/registration'];
