<template>
  <header class="s-main-header">
    <div class="s-main-header-container">
      <NuxtLink to="/" class="s-main-header-logo-anchor">
        <img src="/logo.svg" alt="SPAPS logo" />
      </NuxtLink>
      <NuxtLink to="/password-reset"> reset pas </NuxtLink>
      <NuxtLink to="/registration"> reg </NuxtLink>
      <NuxtLink to="/login"> login </NuxtLink>
      <NuxtLink to="/profile"> profile </NuxtLink>
      <button @click="logout">Logout</button>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const api = useApi();
const userStore = useUserStore();

const logout = async () => {
  await asyncGlobalSpinner(api.AuthorizationService.logout());
  userStore.updateUser(null);
  navigateTo('/login');
};
</script>
