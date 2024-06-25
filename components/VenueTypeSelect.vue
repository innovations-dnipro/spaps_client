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
    <template v-slot:item="{ item, props: { onClick } }">
      <div class="s-town-param-list-item" @click="onClick">
        <span class="s-town-param-list-item-label">{{ item.title }}</span>
      </div>
    </template>
  </VSelect>
</template>
<script setup lang="ts">
import { EVenueType } from '@spaps/enums/venue.type';
import type { Nullable } from '../packages/core/types/nullable';

const props = defineProps({
  venueType: {
    type: String,
    default: null,
  },
});

const $i18n = useI18n();
const emit = defineEmits(['update-venue-type-value']);
const selected: Ref<Nullable<string>> = ref(null);
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
  emit('update-venue-type-value', selected.value);
};

watch(
  () => props.venueType,
  (propsVenueType) => {
    if (selected.value !== propsVenueType) {
      selected.value = propsVenueType;
    }
  }
);
onMounted(() => {
  if (props.venueType) {
    selected.value = props.venueType;
  }
});
</script>
