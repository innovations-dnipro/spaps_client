<template>
  <div class="s-footer">
    <div
      class="s-footer-logo"
      :style="{ 'background-image': 'url(/logo_footer.svg)' }"
      @click="onLogoClick"
    ></div>
    <div class="s-footer-catalog">
      <div class="s-footer-catalog-title">
        {{ $t('footer_messages.catalog') }}
      </div>
      <div class="s-footer-catalog-container">
        <div
          class="s-footer-catalog-item"
          v-for="venueType in venueTypes"
          @click="onCatalogClick(venueType.path)"
        >
          {{ venueType.label }}
        </div>
      </div>
    </div>
    <div class="s-footer-container-2">
      <div class="s-footer-container-2-title">SPAPS</div>
      <div class="s-footer-container-2-list">
        <div class="s-footer-container-2-list-item">
          {{ $t('footer_messages.main') }}
        </div>
        <div class="s-footer-container-2-list-item">
          {{ $t('footer_messages.venues') }}
        </div>
        <div class="s-footer-container-2-list-item">
          {{ $t('footer_messages.events_and_news') }}
        </div>
        <div class="s-footer-container-2-list-item">
          {{ $t('footer_messages.articles') }}
        </div>
        <div class="s-footer-container-2-list-item">
          {{ $t('footer_messages.support_service') }}
        </div>
        <div class="s-footer-container-2-list-item">
          {{ $t('footer_messages.reservations') }}
        </div>
      </div>
      <div class="s-footer-top-button" @click="onTopButtonClick">
        <i class="ph ph-arrow-up"></i>
      </div>
    </div>
    <div class="s-footer-container-3">
      {{ $t('footer_messages.all_rights_protected') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { EVenueType } from '@spaps/enums';

const $i18n = useI18n();

const venueTypes: ComputedRef<Array<{ label: string; path: string }>> =
  computed(() => {
    return Object.values(EVenueType).map((venueType) => {
      return {
        path: `${venueType}`,
        label: $i18n.t(`filter_messages.${venueType}`),
      };
    });
  });

const onLogoClick = () => {
  navigateTo({
    path: '/',
  });
};

const onCatalogClick = (path: string) => {
  navigateTo({
    path: '/search',
    query: {
      venue_type: path,
    },
  });
};

const onTopButtonClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
