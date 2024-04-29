<template>
  <div class="s-login-description">
    {{ $t('registration_messages.email_address_confirmation') }}
  </div>
  <div class="s-registration-code-verification-container">
    <code-verification :inputAmount="5" @on-change="onChange" />
  </div>
  <div class="s-registration-step-2-send-again">
    <button
      @click="onSendAgainButtonClick"
      :disabled="!isCounterHidden"
      class="s-registration-step-2-send-again-btn"
      :class="{
        's-registration-step-2-send-again-btn-disabled': !isCounterHidden,
      }"
    >
      {{ $t('registration_messages.send_code_again')
      }}{{ !isCounterHidden ? $t('registration_messages.colon') : '' }}
    </button>
    <div
      class="s-registration-step-2-send-again-counter"
      :class="{
        's-registration-step-2-send-again-counter-hidden': isCounterHidden,
      }"
    >
      <span>{{ count }}</span
      >{{ $t('registration_messages.sec') }}
    </div>
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
const count = ref(60);
const isCounterHidden = computed(() => count.value <= 0);
const timer = ref(null);

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
const updateCounter = () => {
  timer.value = setTimeout(() => {
    count.value--;

    if (count.value > 0) {
      updateCounter();
    }

    if (count.value <= 0) {
      clearTimeout(timer.value);
    }
  }, 1000);
};
const onSendAgainButtonClick = async () => {
  if (!isCounterHidden.value) {
    return;
  }

  await emit('submit-user-data');

  count.value = 60;
  updateCounter();
};

onMounted(() => {
  updateCounter();
});

onUnmounted(() => {
  if (count.value) {
    count.value = 0;
  }

  if (timer?.value) {
    clearInterval(timer.value);
  }
});
</script>
