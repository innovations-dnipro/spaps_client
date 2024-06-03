<template>
  <div class="s-login">
    <Back />
    <div class="s-login-title mb-2">
      {{ $t('phone_change_messages.phone_number_change') }}
    </div>
    <PhoneChangeStepOne v-if="step === 1" @submit-phone="submitNewPhone" />
    <PhoneChangeStepTwo v-if="step === 2" @submit-phone="submitPhone" />
  </div>
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const api = useApi();
const step = ref(1);
const savedPhone = ref('');

const onChangeStep = (nextStep: number) => {
  step.value = nextStep;
};
const submitPhone = async () => {
  const [response] = await asyncGlobalSpinner(
    api.AuthorizationService.changePhone({
      params: {
        phone: savedPhone.value,
      },
    })
  );

  return response;
};
const submitNewPhone = async (phone: string) => {
  savedPhone.value = phone;
  const response = await submitPhone();

  if (response === 200) {
    onChangeStep(2);
  }
};
</script>
