<template>
  <div class="s-login-description">
    {{ $t('email_change_messages.enter_new_email_address') }}
  </div>
  <v-form
    class="s-login-form"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="formData.email"
      :label="$t('input_messages.email')"
      :placeholder="$t('input_messages.enter_your_email')"
      :rules="[
        requiredValidator,
        emailValidator,
        maxLengthValidator(formData.email, 255),
      ]"
      :readonly="isLoading"
      class="mb-6"
      color="primary"
      hide-details="auto"
      :append-inner-icon="emailInputDropIcon"
      @click:appendInner="dropValue"
    ></v-text-field>
    <button
      :disabled="isDisabled"
      class="s-login-btn mt-0"
      :class="isDisabled && 's-disabled-btn'"
      type="submit"
    >
      <span class="s-login-btn-label">{{
        $t('email_change_messages.send_confirmation')
      }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';
import { useUserStore } from '../stores/user';

const { emailValidator, maxLengthValidator, requiredValidator } =
  useValidators();
const formRef = ref();
const isLoading = ref(false);
const formData: Ref<{}> = ref({
  email: '',
});
const userStore = useUserStore();

const isDisabled = computed(() => {
  return isEmpty(formData.value.email) || isLoading.value;
});
const emailInputDropIcon = computed(() => {
  return formData.value.email ? 'ph ph-x-circle' : '';
});

const emit = defineEmits(['submit-email']);
const dropValue = () => {
  formData.value.email = '';
};
const onSubmit = async () => {
  formData.value.email = formData.value.email.trim();

  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;
  await emit('submit-email', formData.value.email);
  isLoading.value = false;
};

onMounted(() => {
  if (userStore?.user?.email) {
    formData.value.email = userStore.user.email;
  }
});
</script>
