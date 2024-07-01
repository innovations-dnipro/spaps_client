<template>
  <div class="s-profile-info-title">
    {{ $t('profile_rentor_messages.access_rights') }}
  </div>
  <div class="s-profile-rentor-objects-no-objects-container">
    <span>
      {{ $t('profile_rentor_messages.create_first_object') }}
    </span>
    <button
      class="s-profile-rentor-objects-add-new-button"
      @click="navigateTo('/rentor-complex-edit')"
    >
      <span>{{ $t('profile_rentor_messages.add_new_object') }}</span>
      <div class="s-profile-rentor-objects-add-new-button-circle">
        <i class="ph ph-plus-circle"></i>
      </div>
    </button>
  </div>
</template>
