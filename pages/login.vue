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
        :label="$t('input_messages.email')"
        :placeholder="$t('input_messages.enter_your_email')"
        :rules="[
          requiredValidator,
          emailValidator,
          maxLengthValidator(formData.email, 255),
        ]"
        :readonly="isLoading"
        class="mb-4"
        color="primary"
        hide-details="auto"
      ></v-text-field>
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
        class="mb-2"
        color="primary"
        hide-details="auto"
        :append-inner-icon="isPasswordVisible ? 'ph-eye ph' : 'ph-eye-slash ph'"
        :type="isPasswordVisible ? 'text' : 'password'"
        @click:append-inner="isPasswordVisible = !isPasswordVisible"
      ></v-text-field>
      <div class="s-login-forgot-password">
        <a class="s-login-forgot-password-label" href="/password-reset">{{
          $t('login_messages.forgot_password')
        }}</a>
      </div>
      <button
        :disabled="isDisabled"
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
import { isEmpty } from '@spaps/utils';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { ERole } from '@spaps/enums/role';

const {
  requiredValidator,
  emailValidator,
  minLengthValidator,
  maxLengthValidator,
} = useValidators();
const api = useApi();
const route = useRoute();
const formRef = ref();
const isLoading = ref(false);
const isPasswordVisible = ref();
const formData: Ref<{}> = ref({
  email: '',
  password: '',
});

const isDisabled = computed(() => {
  return (
    isEmpty(formData.value.email) ||
    isEmpty(formData.value.password) ||
    isLoading.value
  );
});

const onSubmit = async () => {
  formData.value.email = formData.value.email.trim();
  formData.value.password = formData.value.password.trim();

  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;

  try {
    const [response]: [unknown] = await asyncGlobalSpinner(
      api.AuthorizationService.login({
        data: {
          email: formData.value.email,
          password: formData.value.password,
        },
      })
    );

    isLoading.value = false;

    if (route.query?.next) {
      return navigateTo({ path: `/${route.query?.next}` });
    }

    if (response?.role === ERole.CLIENT) {
      return navigateTo({ path: '/profile' });
    }

    if (response?.role === ERole.RENTOR) {
      return navigateTo({ path: '/owners-office' });
    }
  } catch (e) {
    console.log(e);
    isLoading.value = false;
  }
};
</script>
