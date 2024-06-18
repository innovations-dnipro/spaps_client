<template>
  <div v-if="dialogStore.showsFilterDialog" class="s-fl">
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
        v-if="venueType"
        :venueType="(venueType as EVenueType)"
        :venueSubtypes="(filters.venueSubTypes as [])"
        :queryParams="queryParams"
        :path="route.path"
        @updateSubtype="updateSubtype"
      />
      <FilterDate
        :dateFrom="filters.dateFrom"
        :dateTo="filters.dateTo"
        @updateDate="updateDate"
      />
      <FilterGuestNumber
        :adultNumber="filters.adultNumber"
        :childrenNumber="filters.childrenNumber"
        @updateGuestNumber="updateGuestNumber"
      />
      <FilterPriceRange
        :priceFrom="(filters.priceFrom as Nullable<number>)"
        :priceTo="(filters.priceTo as Nullable<number>)"
        @updatePriceRange="updatePriceRange"
      />
    </div>

    <div class="s-fl-footer">
      <button class="s-fl-footer-show-btn" @click="submitFilters">
        {{ $t('filter_messages.show_search_result') }}
      </button>
      <button class="s-fl-footer-clear-btn" @click="clearFilters">
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
import { useDialogStore } from '../stores/dialog';
import { formatDateToDateTime } from '../packages/utils/format.date';
import { VenueSubtype } from '../packages/values/venue.subtype';
import { YYYY_MM_DD } from '../packages/utils/index';

interface IFilters {
  venueSubTypes: Nullable<Array<string>>;
  dateFrom: Nullable<Date>;
  dateTo: Nullable<Date>;
  adultNumber: Nullable<number>;
  childrenNumber: Nullable<number>;
  priceFrom: Nullable<number>;
  priceTo: Nullable<number>;
}

const filtersInitialValues = {
  venueSubTypes: null,
  dateFrom: null,
  dateTo: null,
  adultNumber: null,
  childrenNumber: null,
  priceFrom: null,
  priceTo: null,
};
const route = useRoute();
const dialogStore = useDialogStore();
const queryParams = computed(() => {
  return route.query;
});
const filters: Ref<IFilters> = ref({
  ...filtersInitialValues,
});
const venueType: Ref<Nullable<keyof EVenueType>> = ref(null);
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
}: {
  selectedSubtypes: string[];
}) => {
  filters.value = {
    ...filters.value,
    venueSubTypes: selectedSubtypes,
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
const updatePriceRange = ({
  priceFrom,
  priceTo,
}: {
  priceFrom: number;
  priceTo: number;
}) => {
  filters.value = {
    ...filters.value,
    ...(isFinite(priceFrom) ? { priceFrom } : {}),
    ...(isFinite(priceTo) ? { priceTo } : {}),
  };

  searchVenues();
};
const toggleDialog = () => {
  emit('close-dialog');
};
const clearFilters = () => {
  filters.value = { ...filtersInitialValues };
};
const submitFilters = () => {
  const newRouteQuery = { ...route.query };

  Array.isArray(filters.value.venueSubTypes) &&
  filters.value.venueSubTypes.length
    ? (newRouteQuery.venue_subtype = filters.value.venueSubTypes.join(','))
    : delete newRouteQuery.venue_subtype;

  filters.value.dateFrom
    ? (newRouteQuery.date_from = formatDateToDateTime({
        value: filters.value.dateFrom,
      }))
    : delete newRouteQuery.date_from;

  filters.value.dateTo
    ? (newRouteQuery.date_to = formatDateToDateTime({
        value: filters.value.dateTo,
      }))
    : delete newRouteQuery.date_to;

  filters.value.adultNumber
    ? (newRouteQuery.adult_number = filters.value.adultNumber)
    : delete newRouteQuery.adult_number;

  filters.value.childrenNumber
    ? (newRouteQuery.children_number = filters.value.childrenNumber)
    : delete newRouteQuery.children_number;

  filters.value.priceFrom
    ? (newRouteQuery.price_from = filters.value.priceFrom)
    : delete newRouteQuery.price_from;

  filters.value.priceTo
    ? (newRouteQuery.price_to = filters.value.priceTo)
    : delete newRouteQuery.price_to;

  navigateTo({
    path: '/search',
    query: {
      ...newRouteQuery,
    },
  });

  emit('close-dialog');
};

onMounted(() => {
  const priceFrom = Number(route.query?.price_from);
  const priceTo = Number(route.query?.price_to);
  const adultNumber = Number(route.query.adult_number);
  const childrenNumber = Number(route.query.children_number);
  const dateFrom =
    (route.query.date_from || '').match(YYYY_MM_DD) &&
    new Date(`${route.query.date_from} 00:00:00:000`);
  const dateTo =
    (route.query.date_to || '').match(YYYY_MM_DD) &&
    new Date(`${route.query.date_to} 23:59:59:999`);

  if (route.query.venue_type) {
    venueType.value = route.query?.venue_type.split(',')[0];
  }
  if (isFinite(priceFrom) && priceFrom >= 0 && priceFrom <= 10000) {
    filters.value.priceFrom = priceFrom;
  }
  if (isFinite(priceTo) && priceTo >= 0 && priceTo <= 10000) {
    filters.value.priceTo = priceTo;
  }
  if (
    filters.value.priceFrom &&
    filters.value.priceTo &&
    filters.value.priceFrom > filters.value.priceTo - 300
  ) {
    filters.value.priceFrom = null;
    filters.value.priceTo = null;
  }

  if (route.query.venue_type && route.query.venue_subtype) {
    const venueType: EVenueType = route.query.venue_type;
    const venueSubtypes: Array<string> = route.query.venue_subtype.split(',');
    const possibleSubtypes = VenueSubtype[venueType] as Array<string>;

    const attestedVenueSubtypes = venueSubtypes.filter((subtype: string) => {
      return possibleSubtypes.includes(subtype);
    });

    filters.value.venueSubTypes = attestedVenueSubtypes;
  }

  if (isFinite(adultNumber)) {
    filters.value.adultNumber = adultNumber;
  }

  if (isFinite(childrenNumber)) {
    filters.value.childrenNumber = childrenNumber;
  }

  if (!filters.value.dateFrom && dateFrom && !dateTo) {
    filters.value.dateFrom = route.query.date_from;
  }

  if (!filters.value.dateTo && dateTo && !dateFrom) {
    filters.value.dateTo = route.query.date_to;
  }

  if (dateFrom && dateTo && dateFrom < dateTo) {
    if (!filters.value.dateFrom) {
      filters.value.dateFrom = route.query.date_from;
    }

    if (!filters.value.dateTo) {
      filters.value.dateTo = route.query.date_to;
    }
  }
});
</script>
