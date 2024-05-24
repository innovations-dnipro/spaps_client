<template>
  <div class="s-login">
    <Back />
    <div class="s-login-title">
      {{ $t('password_change.password_change') }}
    </div>
    <PasswordChangeStepOne v-if="step === 1" @change-step="changeStep(2)" />
    <PasswordChangeStepTwo v-if="step === 2" />
  </div>
</template>
<script lang="ts" setup>
const step = ref(1);

const changeStep = (nextStep: number) => {
  step.value = nextStep;
};
</script>
