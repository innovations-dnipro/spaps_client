import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { useUserStore } from '../stores/user';
import { ProtectedRoute } from '../packages/routes';
import { useToast } from 'vue-toastification';
import type { ERole } from '../packages/core/enums/role';

/**
 * TODO: investigate 500 bug on programmatically entering procted route
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const api = useApi();
  const userStore = useUserStore();
  const path: string = to.path;
  const protectedRouteRoles: ERole[] = ProtectedRoute?.[path];
  const toast = useToast();
  const { $i18n } = useNuxtApp();

  if (protectedRouteRoles) {
    const [code] = await asyncGlobalSpinner(
      api.AuthorizationService.checkIsAuthorized()
    );

    if (code !== 200) {
      if (userStore.user) {
        userStore.updateUser(null);
      }
      toast.error($i18n.t('server_error_messages.UNAUTHORIZED'));
      navigateTo('/login');
      return;
    }

    if (!userStore.user) {
      const response = await asyncGlobalSpinner(
        api.AuthorizationService.getPersonalData()
      );

      if (Array.isArray(response) && response[0].id) {
        await userStore.updateUser(response[0]);
      }
    }

    if (
      userStore.user?.role &&
      !protectedRouteRoles.includes(userStore.user?.role)
    ) {
      toast.error($i18n.t('server_error_messages.WRONG_ROLE'));
      navigateTo('/');
    }
  }
});
