<template>
  <div class="s-fb">
    <div
      class="s-home-container-one-settings"
      @click="updateAdvancedFilters(null)"
    >
      <i class="ph" :class="icon"></i>
    </div>
    <div class="s-fb-main"></div>
  </div>

  <VDialog v-model="dialogStore.showsFilterDialog">
    <FilterList
      @update-advanced-filters="updateAdvancedFilters"
      :venueType="venueType"
    />
  </VDialog>
</template>
<script setup lang="ts">
import { useDialogStore } from '../stores/dialog';

const props = defineProps({
  venueType: {
    type: String,
    default: null,
  },
  town: {
    type: String,
    default: null,
  },
});

const dialogStore = useDialogStore();

const icon = computed(() => {
  return dialogStore.showsFilterDialog ? 'ph-x' : 'ph-sliders-horizontal';
});

const updateAdvancedFilters = (data = null) => {
  dialogStore.toggleFilterDialog(!dialogStore.showsFilterDialog);

  if (data) {
    navigateTo({
      path: '/search',
      query: {
        venue_type: props.venueType,
        ...(props.town ? { location: props.town } : {}),
        ...(data as object),
      },
    });

    setTimeout(() => {
      document
        .getElementById('result-venue-list-anchor')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
};
</script>
