<template>
  <div class="s-fl-item">
    <div
      class="s-fl-item-header"
      :class="{ 's-fl-item-header-open': showsList }"
      @click="onCaretClick"
    >
      <span class="s-fl-item-title">{{
        $t('filter_messages.price_range_per_hour')
      }}</span>
      <div class="s-fl-item-icon">
        <i class="ph" :class="icon"></i>
      </div>
    </div>
    <div class="s-fl-item-main-container s-fpr" v-if="showsList">
      <div class="s-fpr-input-container">
        <VTextField
          :label="$t('input_messages.from')"
          v-model="priceRange[0]"
          suffix="₴"
          color="primary"
          hide-details="auto"
        ></VTextField>
        <!-- 
          @keypress="onKeyPress"
          :rules="[
            minValidator(0)(priceRange[0]),
            maxValidator(priceRange[1] - 300)(priceRange[0]),
          ]" -->
        <div class="s-fpr-input-container-line"></div>
        <VTextField
          :label="$t('input_messages.until')"
          v-model="priceRange[1]"
          suffix="₴"
          color="primary"
          hide-details="auto"
        ></VTextField>
        <!-- 
          @keypress="onKeyPress"
          :rules="[
            minValidator(priceRange[0] + 300)(priceRange[1]),
            maxValidator(10000)(priceRange[1]),
          ]" -->
      </div>
      <div class="s-fpr-slider-container">
        <VRangeSlider
          :max="10000"
          :min="0"
          :step="100"
          v-model="priceRange"
          color="primary"
          hide-details="auto"
          @start="onStart"
          @end="onEnd"
          @update:modelValue="updateMV"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  priceTo: {
    type: [Number, null],
    default: null,
  },
  priceFrom: {
    type: [Number, null],
    default: null,
  },
});
// const { minValidator, maxValidator } = useValidators();
const emit = defineEmits(['updatePriceRange']);
const showsList: Ref<boolean> = ref(false);
const priceRange: Ref<number[]> = ref([0, 10000]);
const initialRange: Ref<number[]> = ref([0, 10000]);
const icon = computed(() => {
  return showsList.value ? 'ph-caret-circle-up' : 'ph-caret-circle-down';
});

const onCaretClick = () => {
  showsList.value = !showsList.value;
};
// const onKeyPress = (event: KeyboardEvent) => {
//   console.log('keypress');

//   if (!Number.isFinite(Number(event.key))) {
//     event.preventDefault();
//     return;
//   }

//   saveRange();
// };
const saveRange = () => {
  emit('updatePriceRange', {
    priceFrom: Number(priceRange.value[0]),
    priceTo: Number(priceRange.value[1]),
  });
};
const onStart = (rangeValue: number[]) => {
  initialRange.value = rangeValue;
};
const onEnd = (rangeValue: number[]) => {
  initialRange.value = rangeValue;

  saveRange();
};
const updateMV = (rangeValue: number[]) => {
  const fromValue = rangeValue[0];
  const toValue = rangeValue[1];
  const isFromMoved = fromValue !== initialRange.value[0];

  if (isFromMoved) {
    const possibleDifference = fromValue + 300;
    const isPossibleDiffWithinMaxLimit = possibleDifference <= 10000;

    if (possibleDifference > toValue) {
      const newToValue = isPossibleDiffWithinMaxLimit
        ? possibleDifference
        : 10000;

      initialRange.value = [fromValue, newToValue];
      priceRange.value = [fromValue, newToValue];
      return;
    }
    return;
  }

  const possibleDifference = toValue - 300;
  const isPossibleDiffWithinMinLimit = possibleDifference >= 0;

  if (possibleDifference < fromValue) {
    const newFromValue = isPossibleDiffWithinMinLimit ? possibleDifference : 0;

    initialRange.value = [newFromValue, toValue];
    priceRange.value = [newFromValue, toValue];
  }
};

watch(
  () => props.priceFrom,
  (priceFrom) => {
    if (priceFrom >= 0 && priceFrom <= props.priceTo - 300) {
      priceRange.value[0] = priceFrom;
      return;
    }

    priceRange.value[0] = 0;
  },
  {
    immediate: true,
  }
);

watch(
  () => props.priceTo,
  (priceTo) => {
    if (priceTo <= 10000 && priceTo >= props.priceFrom + 300) {
      priceRange.value[1] = priceTo;
      return;
    }

    priceRange.value[1] = 10000;
  },
  {
    immediate: true,
  }
);
</script>
