<template>
  <div class="s-profile">
    <Back />
    <span class="s-profile-title">{{
      $t('owners_office_messages.owners_office')
    }}</span>
    <Tabs :tabs="tabs" :currentTab="currentTab" @on-click="selectTab" />
    <div class="s-profile-main-container" v-if="currentTab === 6">
      <ProfileDataManagement />
      <ProfilePersonalization />
      <ProfileSafetyPrivacy />
    </div>
  </div>
</template>
<script lang="ts" setup>
const $i18n = useI18n();
const tabs: Array<{ order: number; label: string }> = [
  { order: 1, label: $i18n.t('owners_office_messages.owners_office') },
  { order: 2, label: $i18n.t('owners_office_messages.my_property') },
  { order: 3, label: $i18n.t('owners_office_messages.employees') },
  { order: 4, label: $i18n.t('owners_office_messages.reviews') },
  { order: 5, label: $i18n.t('owners_office_messages.shares') },
  { order: 6, label: $i18n.t('owners_office_messages.safety') },
];
const currentTab: Ref<number> = ref(6);

const selectTab = (order: number) => {
  currentTab.value = order;
};
</script>
