import { ERole } from '@spaps/enums';

export const ProtectedRoute: { [key: string]: ERole[] } = {
  '/profile': [ERole.CLIENT],
};
