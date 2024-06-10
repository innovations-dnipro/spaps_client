<template>
  <VPagination
    :length="pages"
    :total-visible="totalVisible"
    :model-value="page"
    @update:modelValue="onClick"
    first-icon="ph ph-caret-circle-double-left"
    prev-icon="ph ph-caret-circle-left"
    next-icon="ph ph-caret-circle-right"
    last-icon="ph ph-caret-circle-double-right"
    show-first-last-page
  />
</template>
<script lang="ts" setup>
const page = ref(1);
const pages = ref(10);
const totalVisible = ref(4);

const onClick = (nextPage: number) => {
  console.log({ nextPage });
  page.value = nextPage;
};
</script>
