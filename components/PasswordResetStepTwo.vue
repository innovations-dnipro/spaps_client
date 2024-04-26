<template>
  <div class="s-login-description">
    {{ $t('password_reset.enter_confirmation_code') }}
  </div>
  <div class="s-registration-code-verification-container">
    <code-verification :inputAmount="5" @on-change="onChange" />
  </div>
  <div class="s-registration-step-2-send-again">
    <button @click="onSendAgainButtonClick">
      {{ $t('registration_messages.send_code_again') }}
    </button>
  </div>
  <button
    :disabled="isDisabled"
    class="s-login-btn"
    :class="isDisabled && 's-disabled-btn'"
    @click="onContinueButtonClick"
  >
    <span class="s-login-btn-label">{{
      $t('registration_messages.continue')
    }}</span>
  </button>
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const props = defineProps({
  email: String,
});
const api = useApi();
const code = ref('');
const isDisabled = ref(false);

const emit = defineEmits(['change-step', 'submit-email']);
const onChange = (value: string) => {
  code.value = value;
  isDisabled.value = code.value.length !== 5;
};
const onContinueButtonClick = async () => {
  isDisabled.value = true;
  try {
    const response = await asyncGlobalSpinner(
      api.AuthorizationService.providePasswordResetConfirmCode({
        params: { code: code.value },
        data: { email: props.email },
      })
    );

    if (Array.isArray(response) && response[0] === true) {
      emit('change-step', 3);
    }
  } catch (e) {
    console.log(e);
  }

  isDisabled.value = false;
};
const onSendAgainButtonClick = () => {
  emit('submit-email');
};
</script>
