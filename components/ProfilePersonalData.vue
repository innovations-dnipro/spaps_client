<template>
  <v-form
    class="s-profile-info"
    fast-fail
    ref="formRef"
    @submit.prevent="onSubmit"
  >
    <div class="s-profile-info-title">
      {{ $t('profile_messages.personal_information') }}
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

    <div class="mt-4 s-profile-info-line-three">
      <v-date-input
        v-model="formData.birthDate"
        :label="$t('input_messages.birth_date')"
        :rules="[requiredValidator]"
        :readonly="isLoading"
        :placeholder="$t('input_messages.enter_your_birth_date')"
        color="primary"
        hide-details="auto"
        prepend-icon=""
        prev-icon="ph ph-caret-left"
        next-icon="ph ph-caret-right"
        mode-icon="ph ph-caret-down"
        :max="now"
        :cancel-text="$t('date_input_messages.cancel')"
        @keypress="onDateInputKeyPress"
      ></v-date-input>
      <v-select
        v-model="formData.gender"
        :label="$t('input_messages.gender')"
        :placeholder="$t('input_messages.select_your_gender')"
        :rules="[requiredValidator]"
        :readonly="isLoading"
        :items="genderItems"
        color="primary"
        hide-details="auto"
        :append-inner-icon="genderSelectIcon"
      ></v-select>
    </div>

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
import { EGender } from '@spaps/enums';
import type { Nullable } from '@spaps/core';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { useToast } from 'vue-toastification';

const api = useApi();
const $i18n = useI18n();
const userStore = useUserStore();
const { requiredValidator, maxLengthValidator, alphaValidator } =
  useValidators();
const toast = useToast();
const now = new Date().toISOString().split('T')[0];

const genderItems: Array<{ title: string; value: EGender }> = [
  {
    title: $i18n.t('input_messages.male'),
    value: EGender.MALE,
  },
  {
    title: $i18n.t('input_messages.female'),
    value: EGender.FEMALE,
  },
  {
    title: $i18n.t('input_messages.other'),
    value: EGender.OTHER,
  },
];
const genderIconDictionary: { [key in EGender]: string } = {
  [EGender.MALE]: 'ph ph-gender-male',
  [EGender.FEMALE]: 'ph ph-gender-female',
  [EGender.OTHER]: 'ph ph-gender-nonbinary',
};
const formRef = ref(false);
const formData: Ref<{
  firstName: string;
  lastName: string;
  birthDate: Nullable<Date>;
  gender: EGender;
}> = ref({
  firstName: '',
  lastName: '',
  birthDate: null,
  gender: EGender.FEMALE,
});
const formDataInitialValues: Ref<{
  firstName: string;
  lastName: string;
  birthDate: Nullable<Date>;
  gender: EGender;
}> = ref({
  firstName: '',
  lastName: '',
  birthDate: null,
  gender: EGender.FEMALE,
});
const isLoading = ref(false);

const areValuesChanged = computed(() => {
  let initialBirthDate;
  let newBirthDate;

  if (formDataInitialValues.value.birthDate) {
    const formattedDate = new Date(formDataInitialValues.value.birthDate);
    const offsetDate = new Date(
      formattedDate.getTime() - formattedDate.getTimezoneOffset() * 60000
    );
    initialBirthDate = offsetDate.toISOString().split('T')[0];
  }

  if (formData.value.birthDate) {
    const formattedDate = new Date(formData.value.birthDate);
    const offsetDate = new Date(
      formattedDate.getTime() - formattedDate.getTimezoneOffset() * 60000
    );
    newBirthDate = offsetDate.toISOString().split('T')[0];
  }

  return (
    formData.value.firstName !== formDataInitialValues.value.firstName ||
    formData.value.lastName !== formDataInitialValues.value.lastName ||
    initialBirthDate !== newBirthDate ||
    formData.value.gender !== formDataInitialValues.value.gender
  );
});
const isSubmitDisabled = computed(() => {
  return isLoading.value || !areValuesChanged.value;
});
const genderSelectIcon = computed(() => {
  return genderIconDictionary[formData.value.gender];
});

const onDateInputKeyPress = (event: KeyboardEvent) => {
  event.preventDefault();
};
const onSubmit = async () => {
  let birthDate: Nullable<string> = null;
  const clientId = userStore.user?.clients?.[0]?.id;
  isLoading.value = true;

  if (formData.value.birthDate) {
    const formattedDate = new Date(formData.value.birthDate);
    const offsetDate = new Date(
      formattedDate.getTime() - formattedDate.getTimezoneOffset() * 60000
    );
    birthDate = offsetDate.toISOString().split('T')[0];
  }

  await asyncGlobalSpinner(
    api.ClientService.updateClient({
      params: { clientId },
      data: {
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        birthDate,
        gender: formData.value.gender,
      },
    })
  );
  const [user] = await asyncGlobalSpinner(
    api.AuthorizationService.getPersonalData()
  );

  if (user?.id) {
    await userStore.updateUser(user);
    toast.success(
      $i18n.t('profile_messages.personal_information_was_updated_successfully')
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
    formData.value.gender = userStore?.user?.clients?.[0]?.gender;
    const birthDate: Nullable<string> =
      userStore?.user?.clients?.[0]?.birthDate;

    if (typeof birthDate === 'string' && birthDate?.length === 10) {
      const [year, month, date] = birthDate.split('-');
      formData.value.birthDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(date)
      );
    }

    formDataInitialValues.value = { ...formData.value };
    isLoading.value = false;
  }
});
</script>
