<template>
  <div v-if="filterStore.showsFilters" class="s-fl">
    <div class="s-fl-top">
      <div class="s-fl-close-btn" @click="toggleDialog">
        <i class="ph ph-x"></i>
      </div>
      <div class="s-fl-title">
        {{ $t('filter_messages.advanced_selection_filter') }}
      </div>
    </div>

    <div class="s-fl-main">
      <FilterVenueSubtype
        v-for="item in filters.venueTypes"
        :venueType="item"
        :key="item"
        :queryParams="queryParams"
        :path="route.path"
        @updateSubtype="updateSubtype"
      />
      <FilterDate @updateDate="updateDate" />
      <FilterGuestNumber @updateGuestNumber="updateGuestNumber" />
      <FilterPriceRange />
    </div>

    <div class="s-fl-footer">
      <button class="s-fl-footer-show-btn">
        {{ $t('filter_messages.show_search_result') }}
      </button>
      <button class="s-fl-footer-clear-btn" @click="toggleDialog">
        {{ $t('filter_messages.clear_filters') }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { EVenueType } from '../packages/core/enums/venue.type';
import type { Nullable } from '../packages/core/types/nullable';
import { isEmptyArray } from '../packages/utils/is.empty.array';
import { isNullOrUndefined } from '../packages/utils/is.null.or.undefined';
import { useFilterStore } from '../stores/filter';

interface IFilters {
  venueTypes: string[];
  [EVenueType.bath]: string[];
  [EVenueType.cottage]: string[];
  [EVenueType.hotel]: string[];
  [EVenueType.pool]: string[];
  [EVenueType.spa_center]: string[];
  [EVenueType.tank]: string[];
  [EVenueType.water_park]: string[];
  dateFrom: Nullable<Date>;
  dateTo: Nullable<Date>;
  adultNumber: Nullable<number>;
  childrenNumber: Nullable<number>;
}

const route = useRoute();
const filterStore = useFilterStore();
//const venueTypes: Ref<EVenueType[]> = ref([]);
const queryParams = computed(() => {
  return route.query;
});
const filters: Ref<IFilters> = ref({
  venueTypes: [],
  [EVenueType.bath]: [],
  [EVenueType.cottage]: [],
  [EVenueType.hotel]: [],
  [EVenueType.pool]: [],
  [EVenueType.spa_center]: [],
  [EVenueType.tank]: [],
  [EVenueType.water_park]: [],
  dateFrom: null,
  dateTo: null,
  adultNumber: null,
  childrenNumber: null,
});
const emit = defineEmits(['close-dialog']);

const searchVenues = () => {
  const searchFilters: Partial<IFilters> = {};

  Object.keys(filters.value).forEach((filterKey) => {
    const key: keyof IFilters = filterKey as keyof IFilters;
    const isArray: boolean = Array.isArray(filters.value[key]);

    if (isArray && !isEmptyArray(filters.value[key])) {
      searchFilters[key] = filters.value[key] as any;
      return;
    }
    if (!isArray && !isNullOrUndefined(filters.value[key])) {
      searchFilters[key] = filters.value[key] as any;
    }
  });

  console.dir(searchFilters);
};
const updateSubtype = ({
  selectedSubtypes,
  venueType,
}: {
  selectedSubtypes: string[];
  venueType: EVenueType;
}) => {
  filters.value = {
    ...filters.value,
    [venueType]: selectedSubtypes,
  };

  searchVenues();
};
const updateDate = ({ dateFrom, dateTo }: { dateFrom: Date; dateTo: Date }) => {
  filters.value = {
    ...filters.value,
    dateFrom,
    dateTo,
  };

  searchVenues();
};
const updateGuestNumber = ({
  adultNumber,
  childrenNumber,
}: {
  adultNumber: number;
  childrenNumber: number;
}) => {
  filters.value = {
    ...filters.value,
    adultNumber,
    childrenNumber,
  };

  searchVenues();
};
const toggleDialog = () => {
  emit('close-dialog');
};

onMounted(() => {
  if (route.query.venue_type) {
    const venueTypes = route.query?.venue_type.split(',');

    filters.value = {
      ...filters.value,
      venueTypes,
    };
  }
});
</script>
