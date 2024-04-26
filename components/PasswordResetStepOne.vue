<template>
  <div class="s-login-description">
    {{ $t('password_reset.provide_email') }}
  </div>
  <v-form
    class="s-login-form"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.email"
      :label="$t('input_messages.email')"
      :placeholder="$t('input_messages.enter_your_email')"
      :rules="[
        requiredValidator,
        emailValidator,
        maxLengthValidator(formData.email, 255),
      ]"
      :readonly="isLoading"
      class="mb-6"
      color="primary"
      hide-details="auto"
    ></v-text-field>
    <button
      :disabled="isDisabled"
      class="s-login-btn"
      :class="isDisabled && 's-disabled-btn'"
      type="submit"
    >
      <span class="s-login-btn-label">{{
        $t('registration_messages.continue')
      }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';

const { emailValidator, maxLengthValidator, requiredValidator } =
  useValidators();
const formRef = ref();
const isLoading = ref(false);
const formData: Ref<{}> = ref({
  email: '',
});
const isDisabled = computed(() => {
  return isEmpty(formData.value.email) || isLoading.value;
});

const emit = defineEmits(['submit']);
const onSubmit = async () => {
  formData.value.email = formData.value.email.trim();

  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;
  await emit('submit', formData.value.email);
  isLoading.value = false;
};
</script>
