<template>
  <div class="s-login-description">
    {{ $t('password_change.make_up_new_strong_password') }}
  </div>
  <v-form
    class="s-login-form"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.password"
      :label="$t('input_messages.new_password')"
      :placeholder="$t('input_messages.create_password')"
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
        $t('password_change.change_password')
      }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { useApi } from '@spaps/api';
import { useToast } from 'vue-toastification';
import { ERole } from '@spaps/enums/role';

const api = useApi();
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
const userStore = useUserStore();
const toast = useToast();
const { $i18n } = useNuxtApp();
const router = useRouter();

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

  try {
    const [response] = await asyncGlobalSpinner(
      api.AuthorizationService.putNewPassword({
        data: { password: formData.value.password },
      })
    );

    if (response.id) {
      toast.success(
        $i18n.t('password_change.your_password_was_changed_successfully')
      );
      userStore.updateUser({
        ...(userStore.user || {}),
        password: response.password,
      });
      isLoading.value = false;
      if (response?.role === ERole.CLIENT) {
        router.push({ path: '/profile', query: { tab: 2 } });
      }
      if (response?.role === ERole.RENTOR) {
        router.push({ path: '/owners-office', query: { tab: 6 } });
      }
    }
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
};
</script>
