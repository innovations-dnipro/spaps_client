<template>
  <div class="s-fb">
    <div class="s-home-container-one-settings" @click="toggleFilterDialog">
      <i class="ph" :class="icon"></i>
    </div>
    <div class="s-fb-main"></div>
  </div>

  <VDialog v-model="filterStore.showsFilters">
    <FilterList />
  </VDialog>
</template>
<script setup lang="ts">
import { useFilterStore } from '../stores/filter';

const filterStore = useFilterStore();

const icon = computed(() => {
  return filterStore.showsFilters ? 'ph-x' : 'ph-sliders-horizontal';
});

const toggleFilterDialog = () => {
  filterStore.toggleFilters(!filterStore.showsFilters);
};
</script>
