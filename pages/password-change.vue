<template>
  <div class="s-login">
    <BackToProfile />
    <div class="s-login-title">
      {{ $t('password_reset.access_restoration') }}
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
