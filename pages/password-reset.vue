<template>
  <div class="s-login">
    <back />
    <div class="s-login-title">
      {{ $t('password_reset.access_restoration') }}
    </div>
    <password-reset-step-one v-if="step === 1" @submit="onStepOneSubmit" />
    <password-reset-step-two
      v-if="step === 2"
      :email="savedEmail"
      @change-step="onChangeStep"
      @submit-email="submitEmail"
    />
    <password-reset-step-three v-if="step === 3" />
    <div class="s-login-footer">
      <span class="s-login-footer-span-1">{{
        $t('password_reset.remember_password')
      }}</span>
      <nuxt-link to="/login" v-if="step !== 3">
        <span class="s-login-footer-span-2">{{
          $t('password_reset.enter')
        }}</span>
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const api = useApi();
const step = ref(1);
const savedEmail = ref('');

const onChangeStep = (nextStep: number) => {
  step.value = nextStep;
};
const submitEmail = async () => {
  let response: unknown;

  try {
    response = await asyncGlobalSpinner(
      api.AuthorizationService.providePasswordResetEmail({
        params: {
          email: savedEmail.value,
        },
      })
    );
  } catch (e) {
    console.log(e);
  }

  return response;
};
const onStepOneSubmit = async (email: string) => {
  savedEmail.value = email;
  const response = await submitEmail();

  if (Array.isArray(response) || response?.[0] === true) {
    onChangeStep(2);
  }
};
</script>
