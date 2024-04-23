<template>
  <div class="s-login">
    <Back />
    <div class="s-login-title">
      {{ $t('login_messages.entrance_into_system') }}
    </div>
    <div class="s-login-description">
      {{ $t('login_messages.we_are_happy_to_welcome') }}
    </div>
    <v-form
      class="s-login-form"
      fast-fail
      ref="formRef"
      @submit.prevent="onSubmit"
    >
      <v-text-field
        v-model="formData.email"
        :label="$t('login_messages.email')"
        :placeholder="$t('login_messages.enter_your_email')"
        :rules="[requiredValidator, emailValidator]"
        :readonly="isLoading"
        class="mb-4"
        color="primary"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        :label="$t('login_messages.password')"
        :placeholder="$t('login_messages.enter_your_password')"
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
        :disabled="isDisabled"
        :loading="isLoading"
        class="s-login-btn"
        :class="isDisabled && 's-disabled-btn'"
      >
        <span class="s-login-btn-label">{{
          $t('login_messages.continue')
        }}</span>
      </button>
    </v-form>
    <div class="s-login-footer">
      <span class="s-login-footer-span-1">{{
        $t('login_messages.you_have_no_account')
      }}</span>
      <NuxtLink to="/registration">
        <span class="s-login-footer-span-2">{{
          $t('login_messages.register')
        }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { useValidators } from '@spaps/composables/use.validators';
import { isEmpty } from '@spaps/utils/is.empty';
import { asyncGlobalSpinner } from '../packages/core/loading-worker/index';

const {
  requiredValidator,
  emailValidator,
  minLengthValidator,
  maxLengthValidator,
} = useValidators();
const api = useApi();
const router = useRouter();
const formRef = ref();
const isLoading = ref(false);
const isValid = ref(true);
const isPasswordVisible = ref();
const formData: Ref<{}> = ref({
  email: '',
  password: '',
});

const isDisabled = computed(() => {
  return (
    isEmpty(formData.value.email) ||
    isEmpty(formData.value.password) ||
    isLoading.value ||
    !isValid.value
  );
});

const onSubmit = async () => {
  const { valid } = await formRef.value.validate();
  isValid.value = valid;

  if (!valid) {
    return;
  }

  isLoading.value = true;

  try {
    const response: unknown = await asyncGlobalSpinner(
      api.AuthorizationService.login({
        email: formData.value.email,
        password: formData.value.password,
      })
    );

    if (Array.isArray(response) && response?.length) {
      router.push({ path: '/registration' });
    }
  } catch (e) {
    console.log(e);
  }
  isLoading.value = false;
};
</script>
