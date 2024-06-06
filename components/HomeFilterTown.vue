<template>
  <div class="s-hft">
    <VChip variant="outlined" @click="onClick('all_ukraine')">
      {{ $t('home_messages.all_ukraine') }}
    </VChip>
    <div class="s-hft-scrollable">
      <VChip v-for="town in townList" @click="onClick(town)">
        {{ $t(`location_messages.${town}`) }}
      </VChip>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ELocation } from '@spaps/enums/location';

const route = useRoute();

const townList: Ref<Array<string>> = computed(() => {
  return (Object.values(ELocation) as string[]).slice(0, 9);
});

const onClick = (town: string) => {
  navigateTo({
    path: '/',
    query: {
      ...route.query,
      location: town.toLocaleLowerCase(),
    },
  });
};
</script>
