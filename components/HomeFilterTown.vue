<template>
  <div class="s-hft">
    <VChip
      variant="outlined"
      @click="onClick(ALL_UKAINE)"
      :class="{
        's-hft-outline': selectedTown === ALL_UKAINE,
      }"
    >
      {{ $t('home_messages.all_ukraine') }}
    </VChip>
    <div class="s-hft-scrollable">
      <VChip
        v-for="town in townList"
        @click="onClick(town)"
        :class="{
          's-hft-outline': town === selectedTown,
        }"
      >
        {{ $t(`location_messages.${town}`) }}
      </VChip>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ELocation } from '@spaps/enums/location';

const ALL_UKAINE = 'ALL_UKAINE';
const route = useRoute();
const selectedTown = ref(ALL_UKAINE);
const townList: Ref<Array<string>> = computed(() => {
  return (Object.values(ELocation) as string[]).slice(0, 9);
});

const onClick = (town: string) => {
  if (selectedTown.value === town) {
    if (town === ALL_UKAINE) {
      return;
    }
    selectedTown.value = ALL_UKAINE;
    navigateTo({
      path: '/',
      query: {
        ...route.query,
        location: ALL_UKAINE.toLocaleLowerCase(),
      },
    });

    return;
  }

  if (selectedTown.value !== town) {
    selectedTown.value = town;
    navigateTo({
      path: '/',
      query: {
        ...route.query,
        location: town.toLocaleLowerCase(),
      },
    });
  }

  document
    .getElementById('result-venue-list-anchor')
    ?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  if (route.query.location) {
    selectedTown.value = (route.query.location || '').toUpperCase();
  }
});
</script>
