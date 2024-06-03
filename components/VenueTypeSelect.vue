<template>
  <VSelect
    id="123"
    :items="items"
    class="s-vts"
    :placeholder="$t('venue_type_messages.select_venue_type')"
    persistent-hint
    v-model="selected"
    color="primary"
    :hint="$t('venue_type_messages.select_venue_type')"
    :menu-props="{ contentClass: 's-vts-menu' }"
    @update:modelValue="onUpdate"
  >
    <template v-slot:append-inner>
      <div class="s-vts-inner-icon">
        <img src="/arrow_filled_down.svg" alt="arrow_filled_down" />
      </div>
    </template>
  </VSelect>
</template>
<script setup lang="ts">
import { EVenueType } from '../packages/core/enums/venue.type';

const $i18n = useI18n();
const route = useRoute();

const initialRouteQuery = ref({});
const selected = ref(null);
const items = [
  {
    title: $i18n.t(`filter_messages.${EVenueType.pool}`),
    value: EVenueType.pool,
  },
  {
    title: $i18n.t(`filter_messages.${EVenueType.water_park}`),
    value: EVenueType.water_park,
  },
  {
    title: $i18n.t(`filter_messages.${EVenueType.spa_center}`),
    value: EVenueType.spa_center,
  },
  {
    title: $i18n.t(`filter_messages.${EVenueType.hotel}`),
    value: EVenueType.hotel,
  },
  {
    title: $i18n.t(`filter_messages.${EVenueType.cottage}`),
    value: EVenueType.cottage,
  },
  {
    title: $i18n.t(`filter_messages.${EVenueType.tank}`),
    value: EVenueType.tank,
  },
  {
    title: $i18n.t(`filter_messages.${EVenueType.bath}`),
    value: EVenueType.bath,
  },
];

const onUpdate = () => {
  navigateTo({
    path: '/search', //route.path,
    query: {
      ...initialRouteQuery.value,
      venue_type: selected.value,
    },
  });
};

onMounted(() => {
  initialRouteQuery.value = route.query;

  if (route.query?.venue_type) {
    selected.value = route.query?.venue_type;
  }
});
</script>
