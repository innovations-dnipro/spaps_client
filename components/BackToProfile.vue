<template>
  <div class="s-back" @click="navigateTo('/profile')">
    <i class="ph-caret-circle-left ph"></i>
    <div class="s-back-text">
      {{ $t('back_messages.back_to_profile') }}
    </div>
  </div>
</template>
