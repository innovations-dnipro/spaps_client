import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '../packages/core/loading-worker';
import { useUserStore } from '../stores/user';
import { NonLoggedInRoutes, ProtectedRoute } from '../packages/routes';
import { ERole } from '../packages/core/enums/role';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const api = useApi();
  const userStore = useUserStore();
  const dialogStore = useDialogStore();
  const path: string = to.path;
  const protectedRouteRoles: ERole[] = ProtectedRoute?.[path];
  const isNonLoggedInRoute = NonLoggedInRoutes.includes(path);
  let authorizationCode;
  const router = useRouter();

  try {
    const [code] = await asyncGlobalSpinner(
      api.AuthorizationService.checkIsAuthorized()
    );

    authorizationCode = code;

    if (authorizationCode === 200 && !userStore.user) {
      const [response] = await asyncGlobalSpinner(
        api.AuthorizationService.getPersonalData()
      );

      if (response?.id) {
        await userStore.updateUser(response);
      }
    }
  } catch (error) {
    if (userStore.user) {
      userStore.updateUser(null);
    }
  }

  if (dialogStore.showsFilterDialog) {
    dialogStore.toggleFilterDialog(false);
  }

  if (protectedRouteRoles) {
    if (
      authorizationCode === 200 &&
      userStore.user?.role &&
      !protectedRouteRoles.includes(userStore.user?.role)
    ) {
      return router.push({ path: '/' });
    }

    if (authorizationCode !== 200) {
      return router.push({
        path: '/login',
        query: { next: to.fullPath.slice(1) },
      });
    }
  }

  if (isNonLoggedInRoute) {
    if (authorizationCode === 200 && userStore.user?.id) {
      const role = userStore.user?.role;

      if (role === ERole.CLIENT) {
        return router.push({ path: '/profile' });
      }

      if (role === ERole.RENTOR) {
        return router.push({ path: '/profile-rentor' });
      }
    }
  }
});
