<template>
  <v-form
    class="s-profile-info"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <div class="s-profile-info-title">
      {{ $t('profile_rentor_messages.main_info') }}
    </div>
    <v-text-field
      v-model="formData.firstName"
      :label="$t('input_messages.name')"
      :placeholder="$t('input_messages.enter_your_name')"
      :rules="[
        requiredValidator,
        alphaValidator,
        maxLengthValidator(formData.firstName, 255),
      ]"
      :readonly="isLoading"
      class="mt-4"
      color="primary"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="formData.lastName"
      :label="$t('input_messages.surname')"
      :placeholder="$t('input_messages.enter_your_surname')"
      :rules="[
        requiredValidator,
        alphaValidator,
        maxLengthValidator(formData.lastName, 255),
      ]"
      :readonly="isLoading"
      class="mt-4"
      color="primary"
      hide-details="auto"
    ></v-text-field>

    <button
      :disabled="isSubmitDisabled"
      class="s-login-btn mt-4"
      :class="isSubmitDisabled && 's-disabled-btn'"
      type="submit"
    >
      <span class="s-login-btn-label">{{ $t('profile_messages.save') }}</span>
    </button>
  </v-form>
</template>
<script lang="ts" setup>
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { useToast } from 'vue-toastification';

const api = useApi();
const $i18n = useI18n();
const userStore = useUserStore();
const { requiredValidator, maxLengthValidator, alphaValidator } =
  useValidators();
const toast = useToast();

const formRef = ref(false);
const formData: Ref<{
  firstName: string;
  lastName: string;
}> = ref({
  firstName: '',
  lastName: '',
});
const formDataInitialValues: Ref<{
  firstName: string;
  lastName: string;
}> = ref({
  firstName: '',
  lastName: '',
});
const isLoading = ref(false);

const areValuesChanged = computed(() => {
  return (
    formData.value.firstName !== formDataInitialValues.value.firstName ||
    formData.value.lastName !== formDataInitialValues.value.lastName
  );
});
const isSubmitDisabled = computed(() => {
  return isLoading.value || !areValuesChanged.value;
});

const onSubmit = async () => {
  const rentorId = userStore.user?.rentors?.[0]?.id;
  isLoading.value = true;

  await asyncGlobalSpinner(
    api.RentorService.updateRentor({
      params: { rentorId },
      data: {
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
      },
    })
  );
  const [user] = await asyncGlobalSpinner(
    api.AuthorizationService.getPersonalData()
  );

  if (user?.id) {
    await userStore.updateUser(user);
    toast.success(
      $i18n.t(
        'profile_rentor_messages.main_information_was_updated_successfully'
      )
    );
  }

  formDataInitialValues.value = { ...formData.value };
  isLoading.value = false;
};

onMounted(() => {
  if (userStore?.user) {
    isLoading.value = true;
    formData.value.firstName = userStore.user.firstName;
    formData.value.lastName = userStore.user.lastName;

    formDataInitialValues.value = { ...formData.value };
    isLoading.value = false;
  }
});
</script>
