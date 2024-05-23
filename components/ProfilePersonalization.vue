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
  <div class="s-profile-info-title mb-1 mt-4">
    {{ $t('profile_personalization_messages.safety_and_privacy') }}
  </div>
  <div class="s-profile-settings-item">
    <div class="s-profile-settings-item-icon">
      <i class="ph ph-password"></i>
    </div>
    <div class="s-profile-settings-item-main ml-1">
      <span>{{
        $t('profile_personalization_messages.entrance_password')
      }}</span>
      <NuxtLink to="/password-change" class="s-profile-settings-item-main-link">
        <div class="s-profile-settings-item-main-icon">
          <i class="ph ph-caret-circle-right"></i>
        </div>
      </NuxtLink>
    </div>
  </div>
  <div class="s-profile-settings-item">
    <div class="s-profile-settings-item-icon">
      <i class="ph ph-credit-card"></i>
    </div>
    <div class="s-profile-settings-item-main ml-1">
      <span>{{ $t('profile_personalization_messages.payment_data') }}</span>
      <div>{{ paymentData }}</div>
    </div>
  </div>
  <div class="s-profile-settings-item">
    <div class="s-profile-settings-item-icon">
      <i class="ph ph-user-gear"></i>
    </div>
    <div class="s-profile-settings-item-main ml-1">
      <span>{{ $t('profile_personalization_messages.related_accounts') }}</span>
      <div>{{ accounts }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const language = 'Українська';
const currency = 'UAH, ₴';
const paymentData = 'Відсутні';
const accounts = 'Google';
</script>
