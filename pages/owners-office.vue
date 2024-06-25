<template>
  <div class="s-profile">
    <Back />
    <span class="s-profile-title">{{
      $t('owners_office_messages.owners_office')
    }}</span>
    <Tabs :tabs="tabs" :currentTab="currentTab" @on-click="selectTab" />
    <div class="s-profile-main-container" v-if="currentTab === 1">
      <RentorProperties />
    </div>
    <div class="s-profile-main-container" v-if="currentTab === 3">
      <ProfileDataManagement />
      <ProfilePersonalization />
      <ProfileSafetyPrivacy />
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();
const $i18n = useI18n();
const tabs: Array<{ order: number; label: string }> = [
  { order: 1, label: $i18n.t('owners_office_messages.my_property') },
  { order: 2, label: $i18n.t('owners_office_messages.employees') },
  { order: 3, label: $i18n.t('owners_office_messages.settings') },
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
