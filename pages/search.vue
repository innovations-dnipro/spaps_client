<template>
  <div class="s-home s-search">
    <SearchParameters />
    <div class="s-search-sort-line">
      <VSelect
        class="s-search-sort-btn"
        :items="items"
        :placeholder="$t('venue_type_messages.select_venue_type')"
        v-model="priceSortSelect"
        color="primary"
        @update:modelValue="onUpdate"
      >
        <template v-slot:prepend-inner>
          <div class="s-vts-inner-icon">
            <i class="ph" :class="ByPriceSortPrependIconClass"></i>
          </div>
        </template>
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
      <div class="s-search-sort-render-btn-group">
        <button
          class="s-search-render-line-btn"
          :class="{
            's-search-render-btn-selected':
              listRenderType === ESearchListRenderType.LINE,
          }"
          @click="onRenderTypeButtonClick(ESearchListRenderType.LINE)"
        >
          <i class="ph ph-rows"></i>
        </button>
        <button
          class="s-search-render-tile-btn"
          :class="{
            's-search-render-btn-selected':
              listRenderType === ESearchListRenderType.TILE,
          }"
          @click="onRenderTypeButtonClick(ESearchListRenderType.TILE)"
        >
          <i class="ph ph-square"></i>
        </button>
      </div>
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

    <div class="s-search-title">
      <div id="result-venue-list-anchor"></div>

      {{ $t('home_messages.search_result') }}
    </div>
    <HomeResultVenueList :venueList="venueList" :renderType="listRenderType" />
    <div class="s-home-pagination-container">
      <Pagination />
    </div>
    <AdDetails />
    <div class="s-search-title">
      {{ $t('home_messages.viewed_venues') }}
    </div>
    <div class="s-search-viewed">
      <div class="s-search-viewed-card" v-for="venue in venueList">
        <div
          class="s-search-viewed-card-img"
          :style="{ 'background-image': 'url(/home_temp_venue.png)' }"
        ></div>
        <div class="s-search-viewed-main">
          <div class="s-search-viewed-header">
            <span class="s-search-viewed-title">{{ venue.title }}</span>
            <div class="s-home-venue-card-rating-container">
              <span class="s-home-venue-card-rating">{{ venue.rating }}</span>
              <div class="s-home-venue-card-rating-icon-container">
                <i class="ph ph-star"></i>
              </div>
            </div>
          </div>
          <div class="s-home-venue-card-lower-line s-search-viewed-lower-line">
            <div class="s-home-venue-card-lower-line-guest-amount">
              {{
                $t('home_messages.up_to_guests', {
                  amount: venue.maxGuestAmount,
                })
              }}
            </div>
            <div class="s-home-venue-card-lower-line-price-container">
              <span class="s-home-venue-card-lower-line-price-from">
                {{ $t('home_messages.from') }}
              </span>
              <span
                class="s-home-venue-card-lower-line-price-value s-search-viewed-lower-line-price-value"
                >{{ venue.minPrice }} ₴</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { EPriceSort, ESearchListRenderType } from '@spaps/enums';

const priceSortSelect = ref(EPriceSort.DESC);
const $i18n = useI18n();
const route = useRoute();
const listRenderType = ref(ESearchListRenderType.LINE);

const items = [
  {
    title: $i18n.t(`sort_messages.${EPriceSort.ASC}`),
    value: EPriceSort.ASC,
  },
  {
    title: $i18n.t(`sort_messages.${EPriceSort.DESC}`),
    value: EPriceSort.DESC,
  },
];
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

const ByPriceSortPrependIconClass = computed(() => {
  return priceSortSelect.value === EPriceSort.ASC
    ? 'ph-sort-descending'
    : 'ph-sort-ascending';
});

const onUpdate = (value: string) => {
  navigateTo({
    path: '/search',
    query: {
      ...route.query,
      price_sort: value,
    },
  });
};
const onRenderTypeButtonClick = (value: ESearchListRenderType) => {
  listRenderType.value = value;
};

onMounted(() => {
  if (Object.keys(route.query).length > 0) {
    setTimeout(() => {
      document
        .getElementById('result-venue-list-anchor')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
});
</script>
