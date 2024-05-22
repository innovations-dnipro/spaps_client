<template>
  <div class="s-profile">
    <BackToOffice />
    <span class="s-profile-title">{{
      $t('profile_rentor_messages.personal_data')
    }}</span>
    <div class="s-profile-main-container">
      <ProfileRentorObjects />
      <ProfileRentorMainInfo />
      <ProfileContactDetails />
      <ProfileLogout />
    </div>
  </div>
</template>
<script lang="ts" setup>
// definePageMeta({
//   middleware: 'auth',
// });
</script>
