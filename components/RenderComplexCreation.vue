<template>
  <VForm class="s-rce-general-form" @submit.prevent="onSaveButtonClick">
    <VTextField
      :label="$t('input_messages.complex_name')"
      color="primary"
      v-model="form.name"
    ></VTextField>
    <VTextField
      :label="$t('input_messages.region')"
      color="primary"
      v-model="form.region"
    ></VTextField>
    <VTextField
      :label="$t('input_messages.location')"
      color="primary"
      v-model="form.location"
    ></VTextField>
    <VTextField
      :label="$t('input_messages.address')"
      color="primary"
      v-model="form.address"
    ></VTextField>
    <VTextarea
      :label="$t('input_messages.complex_description')"
      color="primary"
      rows="11"
      v-model="form.description"
    ></VTextarea>
    <div class="s-rce-venue-photos-title">
      {{ $t('complex_messages.complex_photos') }}
    </div>
    <div class="s-rce-venue-photos-section-2">
      <div class="s-rce-venue-photos-section-2-left-block">
        {{ $t('complex_messages.file_size') }}
      </div>
      <label
        for="complex-photo-upload"
        class="s-rce-venue-photos-section-2-upload-btn"
      >
        <span class="s-rce-venue-photos-section-2-upload-btn-label">{{
          $t('complex_messages.upload_photo')
        }}</span>
      </label>
    </div>
    <VFileInput
      class="s-rce-venue-photos-section-2-upload-input"
      id="complex-photo-upload"
      :label="$t('profile_messages.choose_photo')"
      :show-size="true"
      :rules="[
        fileSizeValidator(form.photos, 20000000),
        fileTypeValidator(form.photos, ['image/jpeg', 'image/png']),
      ]"
      validate-on="blur"
      v-model="form.photos"
      ref="fileInputRef"
      hide-details="auto"
      multiple
    ></VFileInput>
    <div class="s-rce-venue-photos-section-2-pending-file-list">
      <div
        class="s-rce-venue-photos-section-2-pending-file-list-item"
        v-for="(name, index) in pendingPhotos"
      >
        <span>{{ name }}</span>
        <button @click="onPendingPhotoRemoveClick(index)">
          <i class="ph ph-x"></i>
        </button>
      </div>
    </div>
    <div class="s-rce-venue-photos-section-3">
      <div class="s-rce-venue-photos-section-3-label">
        <i class="ph ph-camera-plus"></i>
        <span>
          {{ $t('complex_messages.add_complex_photo') }}
        </span>
      </div>
    </div>
    <div class="s-rce-venue-photos-section-4">
      <button
        class="s-rce-venue-photos-section-4-cancel-btn"
        :class="{ 's-disabled-btn': hasFormInitialValues }"
        :disabled="hasFormInitialValues"
        @click="onCancelButtonClick"
      >
        <span>{{ $t('complex_messages.cancel') }}</span>
      </button>
      <button
        class="s-rce-venue-photos-section-4-save-btn"
        :class="{ 's-disabled-btn': hasFormInitialValues }"
        type="submit"
        :disabled="hasFormInitialValues"
      >
        <span>{{ $t('complex_messages.save_changes') }}</span>
      </button>
    </div>
  </VForm>
</template>
<script lang="ts" setup>
import { useToast } from 'vue-toastification';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { useApi } from '@spaps/api';

const api = useApi();
const $i18n = useI18n();
const { fileSizeValidator, fileTypeValidator } = useValidators();
const toast = useToast();

const initialFormValue = {
  name: '',
  region: '',
  location: '',
  address: '',
  description: '',
  photos: [],
};
const form: Ref<{
  name: string;
  region: string;
  location: string;
  address: string;
  description: string;
  photos: File[];
}> = ref({ ...initialFormValue });

const hasFormInitialValues = computed(() => {
  return (
    !form.value.name &&
    !form.value.region &&
    !form.value.location &&
    !form.value.address &&
    !form.value.description &&
    !form.value.photos.length
  );
});
const pendingPhotos = computed(() => {
  return form.value.photos.map(({ name }) => name);
});

const onPendingPhotoRemoveClick = (index: number) => {
  form.value.photos.splice(index, 1);
};
const onCancelButtonClick = () => {
  form.value = { ...initialFormValue };
};
const onSaveButtonClick = async () => {
  const formData = new FormData();

  if (form.value.name) {
    formData.append('name', form.value.name);
  } else {
    formData.append('name', $i18n.t('complex_messages.no_name'));
  }
  if (form.value.region) {
    formData.append('region', form.value.region);
  }
  if (form.value.location) {
    formData.append('location', form.value.location);
  }
  if (form.value.address) {
    formData.append('address', form.value.address);
  }
  if (form.value.description) {
    formData.append('description', form.value.description);
  }
  form.value.photos.forEach((photo) => {
    formData.append('complexPhotos', photo, photo.name);
  });

  const [postComplexResponse] = await asyncGlobalSpinner(
    api.ComplexService.postComplex({
      data: formData,
    })
  );

  if (postComplexResponse?.id) {
    toast.success($i18n.t('complex_messages.complex_was_saved'));
    onCancelButtonClick();
  }
};
</script>
