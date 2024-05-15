<template>
  <div class="s-login">
    <back-to-profile />
    <div class="s-login-title mb-2">
      {{ $t('email_change_messages.email_address_change') }}
    </div>
    <email-change-step-one v-if="step === 1" @submit-email="submitNewEmail" />
    <email-change-step-two v-if="step === 2" @submit-email="submitEmail" />
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
  const [response] = await asyncGlobalSpinner(
    api.AuthorizationService.changeEmail({
      params: {
        email: savedEmail.value,
      },
    })
  );

  return response;
};
const submitNewEmail = async (email: string) => {
  savedEmail.value = email;
  const response = await submitEmail();

  if (response === 200) {
    onChangeStep(2);
  }
};
</script>
