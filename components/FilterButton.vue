<template>
  <div class="s-fb">
    <div class="s-home-container-one-settings" @click="toggleFilterDialog">
      <i class="ph" :class="icon"></i>
    </div>
    <div class="s-fb-main"></div>
  </div>

  <VDialog v-model="dialogStore.showsFilterDialog">
    <FilterList @close-dialog="toggleFilterDialog" />
  </VDialog>
</template>
<script setup lang="ts">
import { useDialogStore } from '../stores/dialog';

const dialogStore = useDialogStore();

const icon = computed(() => {
  return dialogStore.showsFilterDialog ? 'ph-x' : 'ph-sliders-horizontal';
});

const toggleFilterDialog = () => {
  dialogStore.toggleFilterDialog(!dialogStore.showsFilterDialog);
};
</script>
