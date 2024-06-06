<template>
  <div class="s-home-venue-card" v-for="venue in props.venueList">
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
</template>
<script lang="ts" setup>
const props = defineProps({
  venueList: {
    type: Array,
    default: [],
  },
});
</script>
