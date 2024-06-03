<template>
  <div class="s-profile">
    <Back />
    <span class="s-profile-title">{{ $t('profile_messages.profile') }}</span>
    <Tabs :tabs="tabs" :currentTab="currentTab" @on-click="selectTab" />
    <div class="s-profile-main-container" v-if="currentTab === 1">
      <ProfileAvatar />
      <ProfilePersonalData />
      <ProfileContactDetails />
      <ProfileLogout />
    </div>
    <div class="s-profile-main-container" v-if="currentTab === 2">
      <ProfilePersonalization />
      <ProfileSafetyPrivacy />
    </div>
  </div>
</template>
<script lang="ts" setup>
// definePageMeta({
//   middleware: 'auth',
// });
const route = useRoute();
const $i18n = useI18n();
const tabs: Array<{ order: number; label: string }> = [
  { order: 1, label: $i18n.t('profile_messages.pesonal_data') },
  { order: 2, label: $i18n.t('profile_messages.settings') },
  { order: 3, label: $i18n.t('profile_messages.my_reservations') },
];
const currentTab = computed(() => {
  return (route.query.tab && Number(route.query.tab)) || 1;
});

const selectTab = (order: number) => {
  return navigateTo({
    path: route.path,
    query: {
      tab: order,
    },
  });
};
</script>
