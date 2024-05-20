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
      append-inner-icon="ph ph-pencil-simple-line"
      @click:appendInner="resetEmail"
    ></v-text-field>
    <div class="s-profile-contact-details-empty-input" v-if="!email">
      {{ $t('profile_messages.add_your_email') }}
    </div>
    <v-text-field
      v-model="phone"
      :label="$t('input_messages.phone')"
      :readonly="true"
      color="primary"
      class="mt-3"
      hide-details="auto"
      append-inner-icon="ph ph-pencil-simple-line"
    ></v-text-field>
  </div>
  <div class="s-profile-contact-details-empty-input" v-if="!phone">
    {{ $t('profile_messages.add_your_phone') }}
  </div>
</template>
<script lang="ts" setup>
const userStore = useUserStore();
const email = ref('');
const phone = ref('');

const resetEmail = () => {
  navigateTo('/email-change');
};

onMounted(() => {
  if (userStore?.user) {
    email.value = userStore.user.email || '';
    phone.value = userStore.user.phone || '';
  }
});
</script>
