import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filterData', () => {
  const showsFilters: Ref<boolean> = ref(false);

  const toggleFilters = (showsFiltersValue: boolean) => {
    showsFilters.value = showsFiltersValue;
  };

  return {
    showsFilters,
    toggleFilters,
  };
});
