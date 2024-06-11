<template>
  <div class="s-home-ad-details">
    <div class="s-home-ad-details-title">
      {{ $t('home_messages.detailed_metrics') }}
    </div>
    <div class="s-home-ad-details-description">
      {{ $t('home_messages.how_many_people') }}
    </div>
    <button class="s-home-ad-details-button" @click="onAdDetailsButtonClick">
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
</template>
<script lang="ts" setup>
const onAdDetailsButtonClick = () => {
  navigateTo({
    path: '/registration',
  });
};
</script>
