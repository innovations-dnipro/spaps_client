<template>
  <div class="s-fl-item">
    <div
      class="s-fl-item-header"
      :class="{ 's-fl-item-header-open': showsList }"
    >
      <span class="s-fl-item-title">{{
        $t('filter_messages.guest_number')
      }}</span>
      <div class="s-fl-item-icon" @click="onCaretClick">
        <i class="ph" :class="icon"></i>
      </div>
    </div>
    <div class="s-fl-item-main-container s-fgn" v-if="showsList">
      <div class="s-fgn-item">
        <span class="s-fgn-item-label">
          {{ $t('filter_messages.adults') }}
        </span>
        <button
          class="s-fgn-item-btn"
          :class="{ 's-fgn-item-btn-disabled': isAdultMinusDisabled }"
          :disabled="isAdultMinusDisabled"
          @click="onAdultMinusClick"
        >
          <i class="ph ph-minus-circle"></i>
        </button>
        <div class="s-fgn-item-value">{{ adultNumber }}</div>
        <button class="s-fgn-item-btn" @click="onAdultPlusClick">
          <i class="ph ph-plus-circle"></i>
        </button>
      </div>
      <div class="s-fgn-item">
        <span class="s-fgn-item-label">
          {{ $t('filter_messages.children') }}
        </span>
        <button
          class="s-fgn-item-btn"
          :class="{ 's-fgn-item-btn-disabled': isChildrenMinusDisabled }"
          :disabled="isChildrenMinusDisabled"
          @click="onChildrenMinusClick"
        >
          <i class="ph ph-minus-circle"></i>
        </button>
        <div class="s-fgn-item-value">{{ childrenNumber }}</div>
        <button class="s-fgn-item-btn" @click="onChildrenPlusClick">
          <i class="ph ph-plus-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  adultNumber: {
    type: [Number, null],
    default: null,
  },
  childrenNumber: {
    type: [Number, null],
    default: null,
  },
});

const emit = defineEmits(['updateGuestNumber']);
const showsList: Ref<boolean> = ref(false);
const adultNumber: Ref<number> = ref(0);
const childrenNumber: Ref<number> = ref(0);

const icon = computed(() => {
  return showsList.value ? 'ph-caret-circle-up' : 'ph-caret-circle-down';
});
const isAdultMinusDisabled = computed(() => {
  return !adultNumber.value;
});
const isChildrenMinusDisabled = computed(() => {
  return !childrenNumber.value;
});

const updateGuestNumber = () => {
  return emit('updateGuestNumber', {
    adultNumber: adultNumber.value,
    childrenNumber: childrenNumber.value,
  });
};
const onCaretClick = () => {
  showsList.value = !showsList.value;
};
const onAdultMinusClick = () => {
  --adultNumber.value;

  updateGuestNumber();
};
const onAdultPlusClick = () => {
  ++adultNumber.value;

  updateGuestNumber();
};
const onChildrenMinusClick = () => {
  --childrenNumber.value;

  updateGuestNumber();
};
const onChildrenPlusClick = () => {
  ++childrenNumber.value;

  updateGuestNumber();
};

watch(
  () => props.adultNumber,
  (propsAdultNumber) => {
    adultNumber.value = propsAdultNumber;
  },
  {
    immediate: true,
  }
);

watch(
  () => props.childrenNumber,
  (propsChildrentNumber) => {
    childrenNumber.value = propsChildrentNumber;
  },
  {
    immediate: true,
  }
);
</script>
