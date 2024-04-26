<template>
  <div class="s-login-description">
    {{ $t('registration_messages.email_address_confirmation') }}
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

const api = useApi();
const code = ref('');
const isDisabled = ref(false);

const emit = defineEmits(['change-step', 'submit-user-data']);
const onChange = (value: string) => {
  code.value = value;
  isDisabled.value = code.value.length !== 5;
};
const onContinueButtonClick = async () => {
  isDisabled.value = true;
  try {
    const response = await asyncGlobalSpinner(
      api.AuthorizationService.confirmRegistrationCode({
        params: { code: code.value },
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
  emit('submit-user-data');
};
</script>
