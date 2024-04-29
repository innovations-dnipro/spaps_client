<template>
  <div class="s-login-description">
    {{ $t('registration_messages.select_how_you_wish_to_register') }}
  </div>
  <v-form
    class="s-login-form"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <div class="s-registration-toggle-container">
      <button
        type="button"
        :disabled="isLoading"
        class="s-registration-toggle-btn"
        :class="clientToggleButtonClass"
        @click="formData.role = ENonAdminRole.CLIENT"
      >
        <span>{{ $t('registration_messages.customer') }}</span>
      </button>
      <button
        type="button"
        :disabled="isLoading"
        class="s-registration-toggle-btn"
        :class="rentorToggleButtonClass"
        @click="formData.role = ENonAdminRole.RENTOR"
      >
        <span>{{ $t('registration_messages.rentor') }}</span>
      </button>
    </div>
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
      class="mb-4"
      color="primary"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="formData.name"
      :label="$t('input_messages.name')"
      :placeholder="$t('input_messages.enter_your_name')"
      :rules="[
        requiredValidator,
        alphaValidator,
        maxLengthValidator(formData.name, 255),
      ]"
      :readonly="isLoading"
      class="mb-4"
      color="primary"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="formData.surname"
      :label="$t('input_messages.surname')"
      :placeholder="$t('input_messages.enter_your_surname')"
      :rules="[
        requiredValidator,
        alphaValidator,
        maxLengthValidator(formData.surname, 255),
      ]"
      :readonly="isLoading"
      class="mb-4"
      color="primary"
      hide-details="auto"
    ></v-text-field>
    <button
      :disabled="isDisabled"
      class="s-login-btn"
      :class="isDisabled && 's-disabled-btn'"
      type="submit"
    >
      <span class="s-login-btn-label">{{
        $t('registration_messages.continue')
      }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';
import { ENonAdminRole } from '@spaps/enums';

const {
  alphaValidator,
  emailValidator,
  maxLengthValidator,
  requiredValidator,
} = useValidators();
const formRef = ref();
const isLoading = ref(false);
const formData: Ref<{}> = ref({
  email: '',
  name: '',
  surname: '',
  role: ENonAdminRole.CLIENT,
});
const isDisabled = computed(() => {
  return (
    isEmpty(formData.value.email) ||
    isEmpty(formData.value.password) ||
    isLoading.value
  );
});
const clientToggleButtonClass = computed(() => {
  return {
    's-disabled-btn':
      isLoading.value && formData.value.role === ENonAdminRole.CLIENT,
    's-registration-toggle-btn-selected':
      formData.value.role === ENonAdminRole.CLIENT,
  };
});
const rentorToggleButtonClass = computed(() => {
  return {
    's-disabled-btn':
      isLoading.value && formData.value.role === ENonAdminRole.RENTOR,
    's-registration-toggle-btn-selected':
      formData.value.role === ENonAdminRole.RENTOR,
  };
});

const emit = defineEmits(['submit-user-data']);
const onSubmit = async () => {
  formData.value.email = formData.value.email.trim();
  formData.value.name = formData.value.name.trim();
  formData.value.surname = formData.value.surname.trim();

  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;
  await emit('submit-user-data', formData.value);
  isLoading.value = false;
};
</script>
