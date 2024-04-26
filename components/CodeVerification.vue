<template>
  <div class="s-code-verification">
    <code-verification-input
      v-for="(item, index) in inputAmount"
      :key="index"
      :focus="activeInput === index"
      :value="code[index]"
      :has-auto-focus="hasAutoFocus"
      @on-change="onChange"
      @on-keydown="onKeyDown"
      @on-paste="onPaste"
      @on-focus="onFocus(index)"
      @on-blur="onBlur"
      @toggle-control-key="toggleControlKey"
    />
  </div>
</template>
<script lang="ts" setup>
import { EKey, EKeyCode, ECode, EKeyEvent } from '@spaps/enums';

const props = defineProps({
  inputAmount: {
    type: Number,
    default: 5,
  },
  hasAutoFocus: {
    type: Boolean,
    default: false,
  },
});
const { inputAmount, hasAutoFocus } = props;
const value = ref('');
const activeInput = ref(0);
const code = ref([]);
const oldCode = ref([]);
const emit = defineEmits(['on-change']);
const isControlKeyPressed = ref(false);

const onBlur = () => {
  activeInput.value = -1;
};
const onFocus = (inputIndex: number) => {
  activeInput.value = inputIndex;
};
const focusInput = (inputIndex: number) => {
  activeInput.value = Math.max(Math.min(inputAmount - 1, inputIndex), 0);
};
const focusNextInput = () => focusInput(activeInput.value + 1);
const focusPrevInput = () => focusInput(activeInput.value - 1);
const changeCodeAtFocus = (value: any) => {
  oldCode.value = Object.assign([], code.value);
  code.value[activeInput.value] = value;

  if (oldCode.value.join('') !== code.value.join('')) {
    emit('on-change', code.value.join(''));
  }
};
const toggleControlKey = (value: boolean) => {
  isControlKeyPressed.value = value;
};
const onPaste = (event: ClipboardEvent) => {
  event.preventDefault();

  const pastedData = event.clipboardData
    .getData('text/plain')
    .slice(0, inputAmount - activeInput.value)
    .split('');

  if (!pastedData.join('').match(/^\d+$/)) {
    return;
  }

  const currentCharsInOtp = code.value.slice(0, activeInput.value);
  const combinedWithPastedData = currentCharsInOtp.concat(pastedData);

  code.value = combinedWithPastedData.slice(0, inputAmount.value);
  focusInput(combinedWithPastedData.slice(0, inputAmount.value).length);
  emit('on-change', code.value.join(''));
};
const onChange = (value: any) => {
  changeCodeAtFocus(value);
  focusNextInput();
};
const onKeyDown = ({
  event,
  keyEventValue,
}: {
  event: KeyboardEvent;
  keyEventValue: EKeyEvent.KEY | EKeyEvent.CODE | EKeyEvent.KEY_CODE;
}) => {
  const key = event[keyEventValue];

  if (keyEventValue === EKeyEvent.CODE) {
    if (key === ECode.V && !isControlKeyPressed.value) {
      event.preventDefault();
      return;
    }

    if (key === ECode.ARROW_LEFT) {
      event.preventDefault();
      focusPrevInput();
      return;
    }

    if (key === ECode.ARROW_RIGHT) {
      event.preventDefault();
      focusNextInput();
      return;
    }

    if (key === ECode.BACKSPACE) {
      event.preventDefault();
      changeCodeAtFocus('');
      focusPrevInput();
      return;
    }

    if (event.key === ECode.DELETE) {
      event.preventDefault();
      changeCodeAtFocus('');
    }
  }

  if (keyEventValue === EKeyEvent.KEY) {
    if (!isControlKeyPressed.value) {
      if (
        key === EKey.V ||
        key === EKey.V_UPPERCASE ||
        key === EKey.CYRILLIC_M ||
        key === EKey.CYRILLIC_M_UPPERCASE
      ) {
        event.preventDefault();
        return;
      }
    }

    if (key === EKey.ARROW_LEFT) {
      event.preventDefault();
      focusPrevInput();
      return;
    }

    if (key === EKey.ARROW_RIGHT) {
      event.preventDefault();
      focusNextInput();
      return;
    }

    if (key === EKey.BACKSPACE) {
      event.preventDefault();
      changeCodeAtFocus('');
      focusPrevInput();
      return;
    }

    if (event.key === EKey.DELETE) {
      event.preventDefault();
      changeCodeAtFocus('');
    }
  }

  if (keyEventValue === EKeyEvent.KEY_CODE) {
    if (!isControlKeyPressed.value && key === EKeyCode.V) {
      event.preventDefault();
      return;
    }

    if (key === EKeyCode.LEFT_ARROW) {
      event.preventDefault();
      focusPrevInput();
      return;
    }

    if (key === EKeyCode.RIGHT_ARROW) {
      event.preventDefault();
      focusNextInput();
      return;
    }

    if (key === EKeyCode.BACKSPACE) {
      event.preventDefault();
      changeCodeAtFocus('');
      focusPrevInput();
      return;
    }

    if (key === EKeyCode.DELETE) {
      event.preventDefault();
      changeCodeAtFocus('');
    }
  }
};
</script>
