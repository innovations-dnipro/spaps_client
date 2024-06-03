<template>
  <div class="s-login-description">
    {{ $t('password_change.first_enter_current_password') }}
  </div>
  <v-form
    class="s-login-form"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.password"
      :label="$t('input_messages.current_password')"
      :placeholder="$t('input_messages.enter_current_password')"
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
    <button
      :disabled="isSubmitDisabled"
      class="s-login-btn"
      :class="isSubmitDisabled && 's-disabled-btn'"
      type="submit"
    >
      <span class="s-login-btn-label">{{ $t('password_change.confirm') }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';
import { useApi } from '@spaps/api';
import { useToast } from 'vue-toastification';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const api = useApi();
const {
  requiredValidator,
  minLengthValidator,
  maxLengthValidator,
  confirmedValidator,
} = useValidators();
const toast = useToast();
const { $i18n } = useNuxtApp();
const formRef = ref();
const formData: Ref<{ password: string }> = ref({
  password: '',
});
const isPasswordVisible = ref(false);
const isLoading = ref(false);

const isSubmitDisabled = computed(() => {
  return isEmpty(formData.value.password);
});

const emit = defineEmits(['change-step']);
const onSubmit = async () => {
  formData.value.password = formData.value.password.trim();

  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;
  try {
    const [response] = await asyncGlobalSpinner(
      api.AuthorizationService.postCurrentPassword({
        data: { password: formData.value.password },
      })
    );

    if (response === 200) {
      await emit('change-step');
    }

    if (response === 400) {
      toast.error($i18n.t('password_change.check_data'));
    }
  } catch (e) {
    console.log(e);
  }

  isLoading.value = false;
};
</script>
