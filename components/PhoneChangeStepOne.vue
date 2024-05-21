<template>
  <div class="s-login-description">
    {{ $t('phone_change_messages.enter_new_phone_number') }}
  </div>
  <v-form
    class="s-login-form"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      :model-value="maskedPhone"
      @update:model-value="onUpdate"
      @keypress="onKeyPress"
      :label="$t('input_messages.phone')"
      :placeholder="$t('input_messages.enter_your_phone')"
      :rules="[
        requiredValidator,
        phoneValidator(formData.phone),
        maxLengthValidator(formData.phone, 255),
      ]"
      :readonly="isLoading"
      class="mb-6"
      color="primary"
      hide-details="auto"
      :append-inner-icon="phoneInputDropIcon"
      @click:appendInner="dropValue"
    ></v-text-field>
    <button
      :disabled="isDisabled"
      class="s-login-btn mt-0"
      :class="isDisabled && 's-disabled-btn'"
      type="submit"
    >
      <span class="s-login-btn-label">{{
        $t('phone_change_messages.send_confirmation')
      }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';
import { useUserStore } from '../stores/user';
import { Mask } from 'maska';

const { phoneValidator, maxLengthValidator, requiredValidator } =
  useValidators();
const formRef = ref();
const isLoading = ref(false);
const formData: Ref<{
  phone: string;
}> = ref({
  phone: '',
});
const userStore = useUserStore();
const mask = new Mask({ mask: '+38 (0##)-###-##-##' });

const isDisabled = computed(() => {
  return isEmpty(formData.value.phone) || isLoading.value;
});
const phoneInputDropIcon = computed(() => {
  return formData.value.phone ? 'ph ph-x-circle' : '';
});
const maskedPhone = computed(() => {
  return mask.masked(formData.value.phone);
});

const emit = defineEmits(['submit-phone']);
const dropValue = () => {
  formData.value.phone = '';
};
const onSubmit = async () => {
  formData.value.phone = formData.value.phone.trim();
  const { valid } = await formRef.value.validate();

  if (!valid) {
    return;
  }

  isLoading.value = true;
  await emit('submit-phone', `+380${formData.value.phone}`);
  isLoading.value = false;
};
const onKeyPress = (event: KeyboardEvent) => {
  const isKeyNumber = isFinite(Number(event.key));
  const isInputFilled = formData.value.phone.length === 9;

  if (!isKeyNumber || isInputFilled) {
    event.preventDefault();
  }
};
const onUpdate = (value: string) => {
  formData.value.phone = mask.unmasked(value);
};

onMounted(() => {
  if (userStore?.user?.phone) {
    formData.value.phone = String(userStore.user.phone).replace('+380', '');
  }
});
</script>
