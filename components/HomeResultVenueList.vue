<template>
  <div
    class="s-home-venue-card"
    v-if="props.renderType === ESearchListRenderType.TILE"
    v-for="(venue, index) in props.venueList"
  >
    <div class="s-home-venue-card-img-container">
      <img
        class="s-home-venue-card-img"
        src="/home_temp_venue.png"
        alt="venue_image"
        height="246"
      />
    </div>
    <div class="s-home-venue-card-main">
      <div class="s-home-venue-card-header">
        <span class="s-home-venue-card-title">{{ venue.title }}</span>
        <div class="s-home-venue-card-rating-container">
          <span class="s-home-venue-card-rating">{{ venue.rating }}</span>
          <div class="s-home-venue-card-rating-icon-container">
            <i class="ph ph-star"></i>
          </div>
        </div>
      </div>
      <div class="s-home-venue-card-address-line">
        {{ venue.address }}
      </div>
      <div class="s-home-venue-card-lower-line">
        <div class="s-home-venue-card-lower-line-guest-amount">
          {{
            $t('home_messages.up_to_guests', { amount: venue.maxGuestAmount })
          }}
        </div>
        <div class="s-home-venue-card-lower-line-price-container">
          <span class="s-home-venue-card-lower-line-price-from">
            {{ $t('home_messages.from') }}
          </span>
          <span class="s-home-venue-card-lower-line-price-value"
            >{{ venue.minPrice }} ₴</span
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else class="s-home-venue-line-card" v-for="venue in props.venueList">
    <div
      class="s-home-venue-line-card-photo"
      :style="{ 'background-image': 'url(/home_temp_venue.png)' }"
    ></div>
    <div class="s-home-venue-line-card-main">
      <div class="s-home-venue-line-card-header">
        <div class="s-home-venue-line-card-title">{{ venue.title }}</div>
        <div class="s-home-venue-card-rating-container">
          <span class="s-home-venue-card-rating">{{ venue.rating }}</span>
          <div class="s-home-venue-card-rating-icon-container">
            <i class="ph ph-star"></i>
          </div>
        </div>
      </div>
      <div class="s-home-venue-line-card-bottom">
        <span class="s-home-venue-line-card-address">{{ venue.address }}</span>
        <div class="s-home-venue-card-lower-line-price-container">
          <span class="s-home-venue-card-lower-line-price-from">
            {{ $t('home_messages.from') }}
          </span>
          <span class="s-home-venue-card-lower-line-price-value"
            >{{ venue.minPrice }} ₴</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ESearchListRenderType } from '@spaps/enums';

const props = defineProps({
  venueList: {
    type: Array,
    default: [],
  },
  renderType: {
    type: String,
    default: ESearchListRenderType.TILE,
  },
});
</script>
