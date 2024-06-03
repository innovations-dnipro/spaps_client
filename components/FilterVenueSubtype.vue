<template>
  <div class="s-fl-item">
    <div
      class="s-fl-item-header"
      :class="{ 's-fl-item-header-open': showsList }"
      @click="onCaretClick"
    >
      <span class="s-fl-item-title">{{
        $t(`filter_messages.${props.venueType}`)
      }}</span>
      <div class="s-fl-item-icon">
        <i class="ph" :class="icon"></i>
      </div>
    </div>
    <div class="s-flst-list" v-if="showsList">
      <div
        class="s-flst-list-item"
        v-for="subtype in subtypeList"
        :key="subtype"
      >
        <input
          type="checkbox"
          v-model="selectedSubtypes"
          :label="subtype"
          :value="subtype"
          name="subtype"
          @input="onSubtypeInput"
        />
        <span class="s-flst-list-item-label">{{
          $t(`filter_messages.${subtype}`)
        }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { EVenueType } from '@spaps/enums';
import { VenueSubtype } from '@spaps/values';

const props = defineProps({
  //TODO: investigate type
  venueType: {
    type: String,
  },
  queryParams: { type: Object },
  path: { type: String },
});
const emit = defineEmits(['updateSubtype']);

const showsList: Ref<boolean> = ref(false);
const selectedSubtypes: Ref<string[]> = ref([]);

const icon = computed(() => {
  return showsList.value ? 'ph-caret-circle-up' : 'ph-caret-circle-down';
});
const subtypeList = computed(() => {
  return VenueSubtype[props.venueType as EVenueType];
});

const onCaretClick = () => {
  showsList.value = !showsList.value;
};
const onSubtypeInput = (event: Event) => {
  const value: string = (event.target as HTMLInputElement).value;
  const isChecked: boolean = (event.target as HTMLInputElement).checked;

  if (isChecked) {
    selectedSubtypes.value.push(value);
  }

  if (!isChecked) {
    selectedSubtypes.value.splice(selectedSubtypes.value.indexOf(value), 1);
  }

  return emit('updateSubtype', {
    selectedSubtypes: selectedSubtypes.value,
    venueType: props.venueType,
  });
};
</script>
