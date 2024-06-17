<template>
  <div class="s-home-container-one-block-one">
    <div class="s-home-container-one-block-one-layer-one">
      <TownParameter />
      <NameSelect />
    </div>
    <div class="s-home-container-one-block-one-layer-two">
      <div class="s-home-spa-select-container">
        <VenueTypeSelect @show-filter-button="showFilterButton" />
      </div>
      <div class="s-fb-container">
        <FilterButton v-if="showsFilterButton" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { EVenueType } from '@spaps/core/enums/venue.type';

const route = useRoute();
const showsFilterButton = ref(false);

const showFilterButton = () => {
  showsFilterButton.value = true;
};

onMounted(() => {
  const isSearchRoute = route.path === '/search';
  const hasValidVenueType = Object.values(EVenueType).includes(
    route.query.venue_type
  );

  if (isSearchRoute && hasValidVenueType) {
    showsFilterButton.value = !showsFilterButton.value;
  }
});
</script>
