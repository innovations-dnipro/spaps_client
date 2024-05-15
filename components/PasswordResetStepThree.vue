<template>
  <div class="s-login-description">
    {{ $t('password_reset.create_new_password') }}
  </div>
  <password-reset-form @submit-password="submitPassword" />
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const api = useApi();
const router = useRouter();

const submitPassword = async (password: string) => {
  try {
    const response = await asyncGlobalSpinner(
      api.AuthorizationService.resetPassword({
        data: { password },
      })
    );

    if (response === true) {
      router.push({ path: '/login' });
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
