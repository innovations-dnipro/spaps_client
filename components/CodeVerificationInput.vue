<template>
  <v-text-field
    ref="input"
    type="text"
    maxlength="1"
    autocomplete="off"
    pattern="[0-9]"
    inputmode="numeric"
    color="primary"
    class="s-cvi"
    :class="className"
    :width="56"
    :height="56"
    :focused="props.focus"
    :autofocus="props.focus"
    :active="props.focus"
    v-model="model"
    @input="onInput"
    @keydown="onKeyDown"
    @keyup="onKeyUp"
    @paste="onPaste"
    @focus="onFocus"
    @blur="onBlur"
  ></v-text-field>
</template>
<script lang="ts" setup>
import { EKey, EKeyCode, ECode, EKeyEvent } from '@spaps/enums';
import { raf, caf } from '@spaps/utils';

const props = defineProps({
  value: String,
  hasAutoFocus: Boolean,
  focus: Boolean,
});
const model = ref(props.value || '');
const input = ref(null);
const initialAutofocus = ref(null);
const emit = defineEmits([
  'on-change',
  'on-keydown',
  'on-paste',
  'on-focus',
  'on-blur',
  'toggle-control-key',
]);
const className = computed(() => {
  return props.focus || model.value ? '' : 's-cvi-with-dot';
});

const onInput = () => {
  if (model.value.length > 1) {
    model.value = model.value.slice(0, 1);
  }
  return emit('on-change', model.value);
};
const checkIsNumeric = (keyCode: number) => {
  return (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105);
};
const onKeyDown = (event: KeyboardEvent) => {
  const keyEvent = event || window.event;

  if (keyEvent.code) {
    const code: string = keyEvent.key;
    const isNumeric: boolean = code.includes('Digit');

    if (code === ECode.CONTROL_LEFT || code === ECode.CONTROL_RIGHT) {
      emit('toggle-control-key', true);
    }

    if (
      isNumeric ||
      code === ECode.BACKSPACE ||
      code === ECode.ARROW_LEFT ||
      code === ECode.ARROW_RIGHT ||
      code === ECode.DELETE ||
      code === ECode.BACKSPACE ||
      code === ECode.V
    ) {
      return emit('on-keydown', { event, keyEventValue: EKeyEvent.CODE });
    }
  }

  if (keyEvent.key) {
    const key: string = keyEvent.key;
    const isNumeric: boolean = isFinite(parseInt(key as string));

    if (key === EKey.CONTROL) {
      emit('toggle-control-key', true);
    }

    if (
      isNumeric ||
      key === EKey.BACKSPACE ||
      key === EKey.ARROW_LEFT ||
      key === EKey.ARROW_RIGHT ||
      key === EKey.DELETE ||
      key === EKey.V ||
      key === EKey.V_UPPERCASE ||
      key === EKey.CYRILLIC_M ||
      key === EKey.CYRILLIC_M_UPPERCASE
    ) {
      return emit('on-keydown', { event, keyEventValue: EKeyEvent.KEY });
    }
  }

  if (keyEvent.keyCode) {
    const keyCode: number = keyEvent.keyCode;
    const isNumeric: boolean = checkIsNumeric(keyCode as number);

    if (keyCode === EKeyCode.CONTROL) {
      emit('toggle-control-key', true);
    }

    if (
      isNumeric ||
      keyCode === EKeyCode.BACKSPACE ||
      keyCode === EKeyCode.ARROW_LEFT ||
      keyCode === EKeyCode.ARROW_RIGHT ||
      keyCode === EKeyCode.DELETE ||
      keyCode === EKeyCode.BACKSPACE ||
      keyCode === EKeyCode.V
    ) {
      return emit('on-keydown', { event, keyEventValue: EKeyEvent.KEY_CODE });
    }
  }

  keyEvent.preventDefault();
};
const onKeyUp = (event: KeyboardEvent) => {
  const keyEvent = event || window.event;

  if (
    (keyEvent.key && keyEvent.key === EKey.CONTROL) ||
    (keyEvent.code && keyEvent.code === ECode.CONTROL_LEFT) ||
    (keyEvent.code && keyEvent.code === ECode.CONTROL_RIGHT) ||
    (keyEvent.keyCode && keyEvent.keyCode === EKeyCode.CONTROL)
  ) {
    emit('toggle-control-key', false);
  }
};
const onPaste = (event: ClipboardEvent) => emit('on-paste', event);
const onBlur = () => emit('on-blur');
const onFocus = () => {
  input.value.select();
  return emit('on-focus');
};
const triggerFocus = () => {
  if (input.value) {
    input.value.focus();
  }
};

watch(
  () => props.value,
  (newValue: string, oldValue: string) => {
    if (newValue !== oldValue) {
      model.value = newValue;
    }
  }
);
watch(
  () => props.focus,
  (newFocusValue: boolean, oldFocusValue: boolean) => {
    if (oldFocusValue !== newFocusValue && input.value && props.focus) {
      input.value.focus();
      input.value.select();
    }
  }
);

onMounted(() => {
  if (input.value && props.focus && props.hasAutoFocus) {
    initialAutofocus.value = raf(triggerFocus);
  }
});
onBeforeUnmount(() => {
  if (initialAutofocus.value) {
    caf(initialAutofocus);
  }
});
</script>
