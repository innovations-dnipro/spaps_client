<template>
  <div class="s-profile-avatar">
    <v-dialog v-model="dialog">
      <div class="s-profile-avatar-dialog">
        <div class="s-profile-avatar-cropper-container" v-if="showsCropper">
          <div class="s-profile-avatar-cropper-wrapper">
            <cropper
              ref="cropperRef"
              :src="cropperSrc"
              :stencil-props="{
                aspectRatio: 10 / 10,
              }"
            ></cropper>
          </div>
          <button
            class="s-profile-avatar-crop-btn s-login-btn"
            @click="cropImage()"
          >
            {{ $t('profile_messages.crop') }}
          </button>
        </div>
        <v-form
          class="s-profile-avatar-form"
          fast-fail
          v-model="form"
          @submit.prevent="onFileInputSubmit"
          v-else
        >
          <div class="s-profile-avatar-form-input-container">
            <v-file-input
              :label="$t('profile_messages.choose_photo')"
              :show-size="true"
              :rules="[
                requiredValidator,
                fileSizeValidator(formData.file, 20000000),
                fileTypeValidator(formData.file, ['image/jpeg', 'image/png']),
              ]"
              prepend-icon=""
              validate-on="blur"
              prepend-inner-icon="ph-upload-simple ph"
              v-model="formData.file"
              ref="fileInputRef"
              hide-details="auto"
            ></v-file-input>
          </div>
          <button
            :disabled="isSubmitDisabled"
            class="s-login-btn"
            :class="isSubmitDisabled && 's-disabled-btn'"
            type="submit"
          >
            <span class="s-login-btn-label">{{
              $t('profile_messages.next')
            }}</span>
          </button>
        </v-form>
      </div>
    </v-dialog>

    <div class="s-profile-avatar-img-wrapper">
      <img :src="savedImageSrc" alt="Avatar" class="s-profile-avatar-img" />
    </div>
    <div class="s-profile-avatar-right-container">
      <div class="s-profile-avatar-btn" @click="toggleDialog">
        <i class="ph-camera-rotate ph s-profile-avatar-btn-icon"></i>
        <span>{{ $t('profile_messages.load_photo') }}</span>
      </div>
      <div class="s-profile-avatar-description">
        {{ $t('profile_messages.file_size') }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { isEmpty } from '@spaps/utils';
import 'vue-advanced-cropper/dist/style.css';
import { Cropper } from 'vue-advanced-cropper';
import { useApi } from '@spaps/api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';
import { useUserStore } from '../stores/user';
import { AXIOS_BASE_URL } from '../composables/api/interceptors';
import { useToast } from 'vue-toastification';

const api = useApi();
const userStore = useUserStore();
const { requiredValidator, fileSizeValidator, fileTypeValidator } =
  useValidators();
const toast = useToast();

const dialog = ref(false);
const form = ref(false);
const formData: Ref<{}> = ref({
  file: [],
});
const showsCropper = ref(false);
const cropperRef = ref();
const cropperSrc = ref(null);
const { $i18n } = useNuxtApp();

const isSubmitDisabled = computed(() => {
  return isEmpty(formData.value.file) || !formData.value.file;
});
const file = computed(() =>
  Array.isArray(formData.value.file)
    ? formData.value.file[0]
    : formData.value.file
);
const savedFileId = computed(() => {
  return userStore.user?.clients?.[0]?.avatar?.id;
});

const savedImageSrc = computed(() => {
  return savedFileId.value
    ? `${AXIOS_BASE_URL}/v1/clients/avatar/${savedFileId.value}`
    : '';
});

const onFileInputSubmit = () => {
  if (!form.value) {
    return;
  }
  showsCropper.value = true;

  let reader = new FileReader();
  reader.onload = (event) => {
    cropperSrc.value = event.target.result;
  };
  reader.readAsDataURL(file.value);
};
const toggleDialog = () => {
  showsCropper.value = false;
  formData.value.file = [];
  cropperSrc.value = null;

  dialog.value = !dialog.value;
};
const cropImage = async () => {
  if (cropperRef.value) {
    const { canvas } = cropperRef.value.getResult();

    if (canvas) {
      canvas.toBlob(
        async (blob: Blob) => {
          const formData = new FormData();
          const clientId = userStore.user?.clients?.[0]?.id;

          formData.append('clientAvatar', blob, file.value.name);
          const [postAvatarResponse] = await asyncGlobalSpinner(
            api.ClientService.postAvatar({
              params: { clientId },
              data: formData,
            })
          );

          if (postAvatarResponse === 200) {
            const [user] = await asyncGlobalSpinner(
              api.AuthorizationService.getPersonalData()
            );

            if (user?.id) {
              await userStore.updateUser(user);
              toast.success($i18n.t('profile_messages.it_may_take'));
            }

            toggleDialog();
          }
        },
        file.value.type,
        1
      );
    }
  }
};
</script>
