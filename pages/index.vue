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

    <div class="s-av">
      <div class="s-home-subtitle">
        {{ $t('home_messages.are_you_owner') }}
      </div>
      <div class="s-av-description">
        {{ $t('home_messages.place_ad') }}
      </div>
      <div class="s-av-btn-container">
        <button class="s-main-header-spa-owners">
          <span class="s-main-header-spa-owners-label pl-1 pr-1">
            {{ $t('home_messages.add_venue') }}
          </span>
          <div class="s-main-header-spa-owners-circle">
            <i class="ph ph-drop"></i>
          </div>
        </button>
      </div>
    </div>

    <div class="s-home-subtitle">
      {{ $t('home_messages.popular_offers') }}
    </div>

    <HomeFilterTown />
    <HomeResultVenueList :venueList="upperVenueList" />
    <div class="s-home-ad-details">
      <div class="s-home-ad-details-title">
        {{ $t('home_messages.detailed_metrics') }}
      </div>
      <div class="s-home-ad-details-description">
        {{ $t('home_messages.how_many_people') }}
      </div>
      <button class="s-home-ad-details-button">
        <span class="s-home-ad-details-button-label">{{
          $t('home_messages.register')
        }}</span>
        <div class="s-home-ad-details-button-circle">
          <i class="ph ph-drop"></i>
        </div>
      </button>

      <div class="s-home-ad-details-circle-1"></div>
      <div class="s-home-ad-details-circle-2">
        <i class="ph ph-user-focus"></i>
      </div>
      <div class="s-home-ad-details-circle-3"></div>
      <div class="s-home-ad-details-circle-4">
        <i class="ph ph-timer"></i>
      </div>

      <span class="s-home-ad-details-line-1"></span>
      <span class="s-home-ad-details-line-2"></span>
      <span class="s-home-ad-details-line-3"></span>
      <span class="s-home-ad-details-line-4"></span>
      <span class="s-home-ad-details-line-5"></span>
      <span class="s-home-ad-details-line-6"></span>
      <span class="s-home-ad-details-line-7"></span>
      <span class="s-home-ad-details-line-8"></span>
      <span class="s-home-ad-details-line-9"></span>
    </div>
    <HomeResultVenueList :venueList="lowerVenueList" />
  </div>
</template>
<script setup lang="ts">
import { filter_messages } from '../packages/i18n/uk/filter.messages';
import { EVenueType } from '../packages/core/enums/venue.type';

const venueList = ref([
  {
    title: 'Beauty SPA Center Impulse',
    address: 'Бортнічи, вул. Коцюбинського, 22',
    rating: 4.3,
    maxGuestAmount: 20,
    minPrice: 500,
  },
  {
    title: 'Beauty SPA Center Impulse',
    address: 'Бортнічи, вул. Коцюбинського, 22',
    rating: 4.3,
    maxGuestAmount: 20,
    minPrice: 500,
  },
  {
    title: 'Beauty SPA Center Impulse',
    address: 'Бортнічи, вул. Коцюбинського, 22',
    rating: 4.3,
    maxGuestAmount: 20,
    minPrice: 500,
  },
  {
    title: 'Beauty SPA Center Impulse',
    address: 'Бортнічи, вул. Коцюбинського, 22',
    rating: 4.3,
    maxGuestAmount: 20,
    minPrice: 500,
  },
  {
    title: 'Beauty SPA Center Impulse',
    address: 'Бортнічи, вул. Коцюбинського, 22',
    rating: 4.3,
    maxGuestAmount: 20,
    minPrice: 500,
  },
  {
    title: 'Beauty SPA Center Impulse',
    address: 'Бортнічи, вул. Коцюбинського, 22',
    rating: 4.3,
    maxGuestAmount: 20,
    minPrice: 500,
  },
]);

const upperVenueList = computed(() => {
  return venueList.value.slice(0, 3);
});
const lowerVenueList = computed(() => {
  return venueList.value.slice(3);
});

const onVenueTypeClick = (venueTypes: string[]) => {
  navigateTo({
    path: '/',
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
