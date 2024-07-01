<template>
  <div class="s-rce">
    <Back />
    <div class="s-profile-title">
      {{ $t('complex_messages.about_complex') }}
    </div>
    <Tabs :tabs="tabs" :currentTab="currentTab" @on-click="selectTab" />
    <div class="s-rce-general" v-if="currentTab === 1">
      <RenderComplexCreation />
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute();
const $i18n = useI18n();
const tabs: Array<{ order: number; label: string }> = [
  { order: 1, label: $i18n.t('complex_messages.general') },
  { order: 2, label: $i18n.t('complex_messages.complex_services') },
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
