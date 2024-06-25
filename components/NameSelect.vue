<template>
  <VAutocomplete
    v-model="selectedItem"
    :items="[
      'California',
      'Colorado',
      'Florida',
      'Georgia',
      'Texas',
      'Wyoming',
      'New York',
      'Santa Fe De Bogota',
    ]"
    :placeholder="$t('sauna_search_messages.find_by_name')"
    class="s-name-select"
    dense
    density="compact"
    color="primary"
  >
    <template v-slot:append-inner>
      <div class="s-name-select-inner-icon" @click="onSearchClick">
        <i class="ph ph-magnifying-glass"></i>
      </div>
    </template>
  </VAutocomplete>
</template>
<script lang="ts" setup>
const route = useRoute();
const selectedItem = ref(null);

const onSearchClick = () => {
  if (route.path !== '/search' && !selectedItem.value) {
    return;
  }

  const currentRouteQueries = route.path === '/search' ? route.query : {};
  const newQueryParams = { ...currentRouteQueries };

  if (selectedItem.value) {
    newQueryParams.name = (selectedItem.value as string).toLowerCase();
  } else {
    delete newQueryParams.name;
  }

  navigateTo({
    path: '/search',
    query: newQueryParams,
  });
};

onMounted(() => {
  if (route.path === '/search' && route.query?.name) {
    const capitilizedName = route.query.name
      .split(' ')
      .map((word: string) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');

    selectedItem.value = capitilizedName;
  }
});
</script>
