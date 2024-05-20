<template>
  <button class="s-profile-logout mt-7" @click="logout">
    <div class="s-profile-logout-label">
      {{ $t('profile_messages.logout') }}
    </div>
  </button>
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const api = useApi();
const userStore = useUserStore();

const logout = async () => {
  await asyncGlobalSpinner(api.AuthorizationService.logout());
  userStore.updateUser(null);
  navigateTo('/');
};
</script>
