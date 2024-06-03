<template>
  <div class="s-tabs">
    <div
      class="s-tab"
      :class="{ 's-tab-selected': order === currentTab }"
      v-for="{ order, label } in tabs"
      :key="order"
      @click="onClick(order)"
    >
      {{ label }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  tabs: Array<{ order: number; label: string }>,
  currentTab: Number,
});
const emit = defineEmits(['on-click']);

const onClick = (order: number) => {
  emit('on-click', order);
};
</script>
