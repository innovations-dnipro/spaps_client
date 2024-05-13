<template>
  <div class="s-profile">
    <Back />
    <span class="s-profile-title">{{ $t('profile_messages.profile') }}</span>
    <Tabs :tabs="tabs" :currentTab="currentTab" @on-click="selectTab" />
    <div class="s-profile-main-container">
      <ProfileAvatar />
      <ProfilePersonalData />
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});
const $i18n = useI18n();
const tabs: string[] = [
  $i18n.t('profile_messages.pesonal_data'),
  $i18n.t('profile_messages.settings'),
  $i18n.t('profile_messages.my_reservations'),
];
const currentTab: Ref<string> = ref(tabs[0]);

const selectTab = (tab: string) => {
  currentTab.value = tab;
};
</script>
