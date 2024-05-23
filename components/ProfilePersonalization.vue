<template>
  <div class="s-profile-info-title mb-1 mt-4">
    {{ $t('profile_personalization_messages.personalization') }}
  </div>
  <div class="s-profile-settings-item">
    <div class="s-profile-settings-item-icon">
      <i class="ph ph-translate"></i>
    </div>
    <div class="s-profile-settings-item-main ml-1">
      <span>{{
        $t('profile_personalization_messages.interface_language')
      }}</span>
      <div>{{ language }}</div>
    </div>
  </div>
  <div class="s-profile-settings-item">
    <div class="s-profile-settings-item-icon">
      <i class="ph ph-currency-dollar-simple"></i>
    </div>
    <div class="s-profile-settings-item-main ml-1">
      <span>{{
        $t('profile_personalization_messages.selected_currency')
      }}</span>
      <div>{{ currency }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const language = 'Українська';
const currency = 'UAH, ₴';
</script>
