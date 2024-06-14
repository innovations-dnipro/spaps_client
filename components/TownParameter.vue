<template>
  <div class="s-town-param">
    <div class="s-town-param-label" @click="toggleDialog">
      {{ currentTown }}
    </div>
  </div>
  <VDialog v-model="dialog">
    <div class="s-town-param-dialog">
      <div class="s-town-param-header">
        {{ $t('town_param_messages.select_town') }}
      </div>
      <div class="s-town-param-autocomplete-container">
        <VAutocomplete
          v-model="selectedTown"
          :items="fullTownListTransalted"
          density="compact"
          :label="$t('town_param_messages.search')"
          color="primary"
          hide-details="auto"
          class="s-town-param-autocomplete"
        >
          <template v-slot:item="{ item, props: { onClick } }">
            <div class="s-town-param-list-item" @click="onClick">
              <span class="s-town-param-list-item-label">{{ item.title }}</span>
            </div>
          </template>
        </VAutocomplete>
      </div>
      <div class="s-town-param-radio-list-container">
        <div v-for="town in currentTownList" class="s-town-param-list-item">
          <input
            type="radio"
            v-model="selectedTown"
            :value="town"
            class="s-town-param-list-item-input"
            :id="town"
          />
          <label :for="town" class="s-town-param-list-item-label">{{
            $t(`location_messages.${town}`)
          }}</label>
        </div>
      </div>
      <div class="s-town-param-extend-btn-container">
        <i
          class="ph ph-caret-circle-down s-town-param-extend-btn"
          :class="{ 's-town-param-extend-btn-up': !isTownListShort }"
          @click="toggleList"
        ></i>
      </div>
      <div class="s-town-param-submit-btn-container">
        <button class="s-town-param-cancel-btn" @click="cancelTownSelect">
          {{ $t(`town_param_messages.cancel`) }}
        </button>
        <button class="s-town-param-submit-btn" @click="saveTownSelect">
          {{ $t(`town_param_messages.save`) }}
        </button>
      </div>
    </div>
  </VDialog>
</template>
<script lang="ts" setup>
import { ELocation } from '@spaps/enums/location';

const $i18n = useI18n();
const route = useRoute();
const initialTown = $i18n.t(`location_messages.${ELocation.KYIV}`);
const isSearchPath = ref(route.path === '/search');
const currentTown = ref(initialTown);
const selectedTown = ref(ELocation.KYIV);
const dialog = ref(false);
const isTownListShort = ref(true);

const fullTownList: Ref<Array<string>> = computed(() => {
  return Object.values(ELocation);
});
const currentTownList = computed(() => {
  return isTownListShort.value
    ? fullTownList.value.slice(0, 9)
    : fullTownList.value;
});
const fullTownListTransalted = computed(() => {
  return fullTownList.value.map((town) => {
    return {
      title: $i18n.t(`location_messages.${town}`),
      value: town,
    };
  });
});

const toggleDialog = () => {
  dialog.value = !dialog.value;
};
const toggleList = () => {
  isTownListShort.value = !isTownListShort.value;
};
const cancelTownSelect = () => {
  selectedTown.value = null;
  toggleDialog();
};
const saveTownSelect = () => {
  currentTown.value = $i18n.t(`location_messages.${selectedTown.value}`);
  toggleDialog();

  navigateTo({
    path: '/search',
    query: {
      ...route.query,
      location: (selectedTown.value || '').toLocaleLowerCase(),
    },
  });
};

onMounted(() => {
  if (isSearchPath.value && route.query?.location) {
    const town = (route.query?.location || '').toUpperCase();

    selectedTown.value = town;
    currentTown.value = $i18n.t(`location_messages.${town}`);
  }
});
</script>
