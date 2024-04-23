<template>
  <div class="s-spiner-wrapper" v-if="loading" :class="className">
    <img src="/loader.svg" alt="Loader" />
  </div>
</template>

<script setup lang="ts">
import { LoaderManagerInstance } from './index';

const props = withDefaults(
  defineProps<{
    isLoading?: Boolean;
    type: String;
    name: String;
  }>(),
  {
    type: 'local',
    isLoading: false,
    name: '',
  }
);
const loading = ref(props.isLoading);
const className =
  props.type === 'global'
    ? 's-spiner-wrapper__page'
    : 's-spiner-wrapper__local';

if (props.name) {
  LoaderManagerInstance.registerLoaderInstance(
    props.name,
    getCurrentInstance()
  );
}

onBeforeUnmount(() => {
  LoaderManagerInstance.unRegisterLoaderInstance(props.name);
});

watch(
  () => props.isLoading,
  (newData: any) => {
    loading.value = newData;
  }
);
</script>
