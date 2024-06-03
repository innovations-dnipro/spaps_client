<template>
  <v-form
    class="s-login-form"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.password"
      :label="$t('input_messages.password')"
      :placeholder="$t('input_messages.enter_your_password')"
      :rules="[
        requiredValidator,
        minLengthValidator(formData.password, 6),
        maxLengthValidator(formData.password, 15),
      ]"
      :readonly="isLoading"
      class="mb-6"
      color="primary"
      hide-details="auto"
      :append-inner-icon="isPasswordVisible ? 'ph-eye ph' : 'ph-eye-slash ph'"
      :type="isPasswordVisible ? 'text' : 'password'"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    ></v-text-field>
    <v-text-field
      v-model="formData.confirmPassword"
      :label="$t('input_messages.password_confirmation')"
      :placeholder="$t('input_messages.repeate_password')"
      :rules="[
        requiredValidator,
        minLengthValidator(formData.password, 6),
        maxLengthValidator(formData.password, 15),
        confirmedValidator(formData.confirmPassword, formData.password),
      ]"
      :readonly="isLoading"
      class="mb-6"
      color="primary"
      hide-details="auto"
      :append-inner-icon="
        isConfirmPasswordVisible ? 'ph-eye ph' : 'ph-eye-slash ph'
      "
      :type="isConfirmPasswordVisible ? 'text' : 'password'"
      @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
    ></v-text-field>
    <button
      :disabled="isSubmitDisabled"
      class="s-login-btn"
      :class="isSubmitDisabled && 's-disabled-btn'"
      type="submit"
    >
      <span class="s-login-btn-label">{{
        $t('registration_messages.register')
      }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';

const {
  requiredValidator,
  minLengthValidator,
  maxLengthValidator,
  confirmedValidator,
} = useValidators();
const formRef = ref();
const formData: Ref<{}> = ref({
  password: '',
  confirmPassword: '',
});
const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const isLoading = ref(false);

const isSubmitDisabled = computed(() => {
  return (
    isEmpty(formData.value.email) ||
    isEmpty(formData.value.password) ||
    isLoading.value
  );
});

const emit = defineEmits(['submit-password']);
const onSubmit = async () => {
  formData.value.password = formData.value.password.trim();
  formData.value.confirmPassword = formData.value.confirmPassword.trim();

  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;
  await emit('submit-password', formData.value.password);
  isLoading.value = false;
};
</script>
