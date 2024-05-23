<template>
  <div class="s-profile-info-title mb-1 mt-4">
    {{ $t('profile_data_management_messages.data_management') }}
  </div>
  <div class="s-profile-settings-item">
    <div class="s-profile-settings-item-icon">
      <i class="ph ph-fingerprint-simple"></i>
    </div>
    <div class="s-profile-settings-item-main ml-1">
      <span>{{ $t('profile_data_management_messages.personal_data') }}</span>
      <NuxtLink to="/profile-rentor" class="s-profile-settings-item-main-link">
        <div class="s-profile-settings-item-main-icon">
          <i class="ph ph-caret-circle-right"></i>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
