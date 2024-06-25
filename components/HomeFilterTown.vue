<template>
  <div class="s-hft">
    <VChip
      variant="outlined"
      @click="onClick(ELocation.ALL_UKAINE)"
      :class="{
        's-hft-outline': selectedTown === ELocation.ALL_UKAINE,
      }"
    >
      {{ $t('home_messages.ukraine') }}
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

const route = useRoute();
const selectedTown = ref(ELocation.ALL_UKAINE);
const townList: Ref<Array<string>> = computed(() => {
  return (Object.values(ELocation) as string[]).slice(1, 10);
});

const onClick = (town: string) => {
  if (selectedTown.value === town) {
    if (town === ELocation.ALL_UKAINE) {
      return;
    }
    selectedTown.value = ELocation.ALL_UKAINE;
    navigateTo({
      path: '/',
      query: {
        ...route.query,
        location: ELocation.ALL_UKAINE,
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
        location: town,
      },
    });
  }

  document
    .getElementById('result-venue-list-anchor')
    ?.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  if (route.query.location) {
    selectedTown.value = route.query.location;
  }
});
</script>
