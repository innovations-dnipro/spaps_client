<template>
  <div class="s-home">
    <div class="s-home-container-one">
      <SearchParameters />
      <div class="s-home-container-one-video-block">
        <img
          src="/bush_and_foam.gif"
          alt="bush and foam"
          width="328"
          height="200"
        />
      </div>
    </div>

    <div class="s-home-container-two">
      <div
        class="s-home-container-two-column-one"
        @click="onVenueTypeClick([EVenueType.pool, EVenueType.water_park])"
      >
        <img src="/home_pools.png" alt="swimming_pools" />
        <span class="s-home-container-two-column-title"
          >{{ filter_messages[EVenueType.pool] }},
          {{ filter_messages[EVenueType.water_park] }}</span
        >
      </div>
      <div
        class="s-home-container-two-column-two"
        @click="onVenueTypeClick([EVenueType.spa_center, EVenueType.hotel])"
      >
        <img src="/home_spa_centers.png" alt="spa_centers" />
        <span class="s-home-container-two-column-title"
          >{{ filter_messages[EVenueType.spa_center] }},
          {{ filter_messages[EVenueType.hotel] }}</span
        >
      </div>
      <div class="s-home-container-two-column-three">
        <div
          class="s-home-container-two-column-three-block-one"
          @click="onVenueTypeClick([EVenueType.cottage])"
        >
          <img src="/home_cottages.png" alt="spa_centers" />
          <span class="s-home-container-two-column-title">{{
            filter_messages[EVenueType.cottage]
          }}</span>
        </div>
        <div
          class="s-home-container-two-column-three-block-two"
          @click="onVenueTypeClick([EVenueType.tank, EVenueType.bath])"
        >
          <img src="/home_baths.png" alt="spa_centers" />
          <span class="s-home-container-two-column-title"
            >{{ filter_messages[EVenueType.tank] }},
            {{ filter_messages[EVenueType.bath] }}</span
          >
        </div>
      </div>
    </div>

    <FilterList />
  </div>
</template>
<script setup lang="ts">
import { filter_messages } from '../packages/i18n/uk/filter.messages';
import { EVenueType } from '../packages/core/enums/venue.type';

const $i18n = useI18n();

const onVenueTypeClick = (venueTypes: string[]) => {
  navigateTo({
    path: '/search',
    query: {
      venue_type: venueTypes.join(','),
    },
  });
};
</script>

<style scoped lang="scss">
section {
  height: 100vh;
  overflow: hidden;

  @media (max-width: 640px) {
    height: fit-content;
  }
}
#section2,
#section3,
#section4 {
  height: fit-content;
}
</style>
