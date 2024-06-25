<template>
  <div class="s-rps">
    <div class="s-rps-line-1">
      <button class="s-rps-line-1-search-btn">
        <i class="ph ph-magnifying-glass"></i>
      </button>
      <div class="s-rps-line-1-toggle">
        <button
          class="s-rps-line-1-active-btn"
          :class="{
            's-rps-line-1-active-selected-btn': areActivePropertiesShown,
          }"
          @click="toggleActivePropertiesShown(true)"
        >
          {{ $t('rentor_properties_messages.active') }}
        </button>
        <button
          class="s-rps-line-1-active-btn"
          :class="{
            's-rps-line-1-active-selected-btn': !areActivePropertiesShown,
          }"
          @click="toggleActivePropertiesShown(false)"
        >
          {{ $t('rentor_properties_messages.hidden') }}
        </button>
      </div>
    </div>
    <button
      class="s-rps-line-2"
      @click="navigateTo({ path: '/rentor-complex-edit' })"
    >
      <i class="ph ph-plus-circle"></i>
      <span class="s-rps-line-2-add-complex">
        {{ $t('rentor_properties_messages.add_complex') }}</span
      >
    </button>
    <div class="s-rps-plus-btn-container">
      <button
        class="s-rps-plus-btn"
        @click="navigateTo({ path: '/rentor-complex-edit' })"
      >
        <i class="ph ph-plus"></i>
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
const areActivePropertiesShown = ref(true);

const toggleActivePropertiesShown = (value: boolean) => {
  areActivePropertiesShown.value = value;
};
</script>
