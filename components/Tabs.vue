<template>
  <div class="s-tabs">
    <div
      class="s-tab"
      :class="{ 's-tab-selected': tab === currentTab }"
      v-for="tab in tabs"
      :key="tab"
      @click="onClick(tab)"
    >
      {{ tab }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  tabs: Array<string>,
  currentTab: String,
});
const emit = defineEmits(['on-click']);

const onClick = (tab: string) => {
  emit('on-click', tab);
};
</script>
