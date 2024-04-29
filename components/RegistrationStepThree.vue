<template>
  <div class="s-login-description">
    {{ $t('registration_messages.safety_setting') }}
  </div>
  <password-reset-form @submit-password="submitPassword" />
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';

const api = useApi();
const router = useRouter();

const submitPassword = async (password: string) => {
  try {
    const response = await api.AuthorizationService.setPassword({
      data: { password },
    });

    if (response === true) {
      router.push({ path: '/profile' });
    }
  } catch (e) {
    console.log(e);
  }
};
</script>
