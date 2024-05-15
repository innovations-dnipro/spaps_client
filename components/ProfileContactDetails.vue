<template>
  <div>
    <div class="s-profile-info-title mt-4 mb-3">
      {{ $t('profile_messages.contact_details') }}
    </div>
    <v-text-field
      v-model="email"
      :label="$t('input_messages.email')"
      :readonly="true"
      color="primary"
      hide-details="auto"
      append-inner-icon="ph ph-pencil-simple"
      @click:appendInner="resetEmail"
    ></v-text-field>
    <div class="s-profile-contact-details-empty-input" v-if="!email">
      {{ $t('profile_messages.add_your_email') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const userStore = useUserStore();
const email = ref('');

const resetEmail = () => {
  navigateTo('/email-change');
};

onMounted(() => {
  if (userStore?.user?.email) {
    email.value = userStore.user.email;
  }
});
</script>
