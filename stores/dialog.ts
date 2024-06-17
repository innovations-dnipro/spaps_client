import { defineStore } from 'pinia';

export const useDialogStore = defineStore('DialogData', () => {
  const showsFilterDialog: Ref<boolean> = ref(false);

  const toggleFilterDialog = (showsFilterDialogValue: boolean) => {
    showsFilterDialog.value = showsFilterDialogValue;
  };

  return {
    showsFilterDialog,
    toggleFilterDialog,
  };
});
