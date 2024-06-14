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
        :class="{
          's-home-container-two-column-selected':
            currentVenueType === poolWaterPark,
        }"
        @click="onVenueTypeClick(poolWaterPark)"
      >
        <img src="/home_pools.png" alt="swimming_pools" />
        <span class="s-home-container-two-column-title"
          >{{ filter_messages[EVenueType.pool] }},
          {{ filter_messages[EVenueType.water_park] }}</span
        >
      </div>
      <div
        class="s-home-container-two-column-two"
        :class="{
          's-home-container-two-column-selected':
            currentVenueType === spaCenterHotel,
        }"
        @click="onVenueTypeClick(spaCenterHotel)"
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
          :class="{
            's-home-container-two-column-selected':
              currentVenueType === EVenueType.cottage,
          }"
          @click="onVenueTypeClick(EVenueType.cottage)"
        >
          <img src="/home_cottages.png" alt="spa_centers" />
          <span class="s-home-container-two-column-title">{{
            filter_messages[EVenueType.cottage]
          }}</span>
        </div>
        <div
          class="s-home-container-two-column-three-block-two"
          :class="{
            's-home-container-two-column-selected':
              currentVenueType === tankBath,
          }"
          @click="onVenueTypeClick(tankBath)"
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
    <div id="result-venue-list-anchor"></div>
    <HomeResultVenueList
      :venueList="upperVenueList"
      id="home_venue_card_list"
    />
    <AdDetails />
    <HomeResultVenueList :venueList="lowerVenueList" />
    <div class="s-home-pagination-container">
      <Pagination />
    </div>
    <div class="s-home-subtitle mt-7 mb-5">
      {{ $t('home_messages.promotions') }}
    </div>
    <div class="s-home-promotion">
      <PromoCard />
      <PromoCard />
      <PromoCard />
      <PromoCard />
    </div>
    <div class="s-home-reliability">
      <div class="s-home-reliability-title">
        {{ $t('home_messages.reservation_reliability') }}
      </div>
      <div class="s-home-reliability-text">
        {{ $t('home_messages.plan_your_vacation') }}
      </div>
      <div class="s-home-reliability-btn-container">
        <button class="s-main-header-spa-owners">
          <span class="s-main-header-spa-owners-label">
            {{ $t('home_messages.select_sauna_now') }}
          </span>
          <div class="s-main-header-spa-owners-circle">
            <i class="ph ph-drop"></i>
          </div>
        </button>
      </div>
      <img
        src="/home-reliability-circles.svg"
        class="s-home-reliability-background"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { filter_messages } from '../packages/i18n/uk/filter.messages';
import { EVenueType } from '../packages/core/enums/venue.type';

const page = ref(1);
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
const route = useRoute();
const currentVenueType = ref('');
const poolWaterPark = ref(`${EVenueType.pool},${EVenueType.water_park}`);
const spaCenterHotel = ref(`${EVenueType.spa_center},${EVenueType.hotel}`);
const tankBath = ref(`${EVenueType.tank},${EVenueType.bath}`);

const upperVenueList = computed(() => {
  return venueList.value.slice(0, 3);
});
const lowerVenueList = computed(() => {
  return venueList.value.slice(3);
});

const onVenueTypeClick = (venueTypes: string) => {
  const isCurrentVenueType = route.query.venue_type === venueTypes;
  const newQuery = {
    ...route.query,
  };

  if (isCurrentVenueType && newQuery.venue_type) {
    delete newQuery.venue_type;
    currentVenueType.value = '';
  }

  if (!isCurrentVenueType) {
    newQuery.venue_type = venueTypes;
    currentVenueType.value = venueTypes;
  }

  navigateTo({
    path: '/',
    query: newQuery,
  });

  if (!isCurrentVenueType) {
    document
      .getElementById('result-venue-list-anchor')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  currentVenueType.value = route.query.venue_type;

  if (Object.keys(route.query).length > 0) {
    setTimeout(() => {
      document
        .getElementById('result-venue-list-anchor')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
});
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
