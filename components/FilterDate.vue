<template>
  <div class="s-fl-item">
    <div
      class="s-fl-item-header"
      :class="{ 's-fl-item-header-open': showsList }"
      @click="onCaretClick"
    >
      <span class="s-fl-item-title">{{ $t('filter_messages.date') }}</span>
      <div class="s-fl-item-icon">
        <i class="ph" :class="icon"></i>
      </div>
    </div>
    <div class="s-fl-item-main-container" v-if="showsList">
      <v-date-input
        v-model="dateFrom"
        :label="$t('input_messages.from')"
        :placeholder="$t('input_messages.enter_your_birth_date')"
        color="primary"
        hide-details="auto"
        prepend-icon=""
        prev-icon="ph ph-caret-left"
        next-icon="ph ph-caret-right"
        mode-icon="ph ph-caret-down"
        :cancel-text="$t('date_input_messages.cancel')"
        :min="now"
        :max="dateFromMax"
        @keypress="onDateInputKeyPress"
        @update:modelValue="updateDate"
      ></v-date-input>
      <div class="s-filter-date-link-icon-container">
        <i class="ph ph-link-simple-horizontal"></i>
      </div>
      <v-date-input
        v-model="dateTo"
        :label="$t('input_messages.until')"
        :placeholder="$t('input_messages.enter_your_birth_date')"
        color="primary"
        hide-details="auto"
        prepend-icon=""
        prev-icon="ph ph-caret-left"
        next-icon="ph ph-caret-right"
        mode-icon="ph ph-caret-down"
        :cancel-text="$t('date_input_messages.cancel')"
        :min="dateToMin"
        @keypress="onDateInputKeyPress"
        @update:modelValue="updateDate"
      ></v-date-input>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Nullable } from '../packages/core/types/nullable';

const emit = defineEmits(['updateDate']);
const showsList: Ref<boolean> = ref(false);
const dateFrom: Ref<Nullable<Date>> = ref(null);
const dateTo: Ref<Nullable<Date>> = ref(null);
const now: string = new Date().toISOString().split('T')[0];

const icon = computed(() => {
  return showsList.value ? 'ph-caret-circle-up' : 'ph-caret-circle-down';
});
const dateFromMax = computed(() => {
  return dateTo.value;
});
const dateToMin = computed(() => {
  return dateFrom.value || now;
});

const onCaretClick = () => {
  showsList.value = !showsList.value;
};
const onDateInputKeyPress = (event: KeyboardEvent) => {
  event.preventDefault();
};
const updateDate = () => {
  return emit('updateDate', {
    dateFrom: dateFrom.value,
    dateTo: dateTo.value,
  });
};
</script>
