<template>
  <div class="s-login">
    <back />
    <div class="s-login-title">
      {{ $t('registration_messages.registration') }}
    </div>
    <registration-step-one
      v-if="step === 1"
      @submit-user-data="onStepOneSubmitData"
    />
    <registration-step-two
      v-if="step === 2"
      @change-step="changeStep(3)"
      @submit-user-data="submitData"
    />
    <registration-step-three v-if="step === 3" />
    <div class="s-login-footer">
      <span class="s-login-footer-span-1">{{
        $t('registration_messages.already_registered')
      }}</span>
      <nuxt-link to="/login">
        <span class="s-login-footer-span-2">{{
          $t('registration_messages.enter')
        }}</span>
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { type IRegister } from '@spaps/api/interfaces/auth';

const api = useApi();
const step = ref(1);
const userData = ref(null);

const changeStep = (nextStep: number) => {
  step.value = nextStep;
};
const submitData = async () => {
  let response: unknown;

  try {
    response = await asyncGlobalSpinner(
      api.AuthorizationService.register({
        data: {
          email: userData.value.email,
          firstName: userData.value.name,
          lastName: userData.value.surname,
          role: userData.value.role,
        },
      })
    );
  } catch (e) {
    console.log(e);
  }

  return response;
};
const onStepOneSubmitData = async (data?: IRegister) => {
  userData.value = data;

  const [response] = await submitData();

  if (response === true && data) {
    changeStep(2);
  }
};
</script>
