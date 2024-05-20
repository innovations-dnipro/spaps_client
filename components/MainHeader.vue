<template>
  <header class="s-main-header">
    <div class="s-main-header-layer-one">
      <NuxtLink to="/" class="s-main-header-logo-anchor">
        <img src="/logo.svg" alt="SPAPS logo" />
      </NuxtLink>
      <!-- <NuxtLink to="/password-reset"> PS </NuxtLink>
      <NuxtLink to="/registration"> RG </NuxtLink>
      <NuxtLink to="/profile"> PR </NuxtLink> -->
      <button class="s-main-header-spa-owners" @click="handleProfileNavigation">
        <span class="s-main-header-spa-owners-label">{{
          $t('header_messages.spa_owners')
        }}</span>
        <div class="s-main-header-spa-owners-circle">
          <i class="ph ph-drop"></i>
        </div>
      </button>
    </div>
    <div class="s-main-header-layer-two">
      <button class="s-main-header-layer-two-block-one-btn">
        <div class="s-main-header-layer-two-block-one-icon-container">
          <i class="ph ph-dots-three-outline"></i>
        </div>
        <span class="s-main-header-layer-two-block-one-label">{{
          $t('header_messages.menu')
        }}</span>
      </button>
    </div>
  </header>
</template>
<script lang="ts" setup>
const userStore = useUserStore();

const handleProfileNavigation = () => {
  const path = userStore.user?.id ? '/profile' : '/login';

  navigateTo(path);
};
</script>
