<template>
  <div class="s-login-description">
    {{ $t('email_change_messages.new_email_address_confirmation') }}
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
      $t('email_change_messages.confirm')
    }}</span>
  </button>
</template>
<script lang="ts" setup>
import type { Nullable, TTimeout } from '@spaps/types';
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { useToast } from 'vue-toastification';
import { useUserStore } from '../stores/user';
import { ERole } from '../packages/core/enums/role';

const api = useApi();
const count = ref(60);
const isCounterHidden = computed(() => count.value <= 0);
const timer: Ref<Nullable<TTimeout>> = ref(null);
const code = ref('');
const isDisabled = ref(false);
const userStore = useUserStore();
const toast = useToast();
const { $i18n } = useNuxtApp();

const emit = defineEmits(['submit-email']);
const onChange = (value: string) => {
  code.value = value;
  isDisabled.value = code.value.length !== 5;
};
const updateCounter = () => {
  timer.value = setTimeout(() => {
    count.value--;

    if (count.value > 0) {
      updateCounter();
    }

    if (count.value <= 0) {
      clearTimeout(timer.value as TTimeout);
    }
  }, 1000);
};
const onSendAgainButtonClick = async () => {
  if (!isCounterHidden.value) {
    return;
  }

  await emit('submit-email');

  count.value = 60;
  updateCounter();
};
const onContinueButtonClick = async () => {
  isDisabled.value = true;
  try {
    const [response] = await asyncGlobalSpinner(
      api.AuthorizationService.confirmEmailChangeCode({
        params: { code: code.value },
      })
    );

    if (response?.email) {
      toast.success(
        $i18n.t('email_change_messages.your_email_address_was_changed')
      );
      userStore.updateUser({
        ...(userStore.user || {}),
        email: response.email,
      });

      if (userStore.user?.role === ERole.CLIENT) {
        navigateTo('/profile');
      }

      if (userStore.user?.role === ERole.RENTOR) {
        navigateTo('/profile-rentor');
      }
    }
  } catch (e) {
    console.log(e);
  }

  isDisabled.value = false;
};

onMounted(() => {
  updateCounter();
});

onUnmounted(() => {
  if (count.value) {
    count.value = 0;
  }

  if (timer?.value) {
    clearTimeout(timer.value as TTimeout);
  }
});
</script>
