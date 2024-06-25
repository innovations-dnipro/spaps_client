<template>
  <div class="s-home-container-one-block-one">
    <div class="s-home-container-one-block-one-layer-one">
      <TownParameter
        @update-town-value="updateTownValue"
        :town="(town as string)"
      />
      <NameSelect />
    </div>
    <div class="s-home-container-one-block-one-layer-two">
      <div class="s-home-spa-select-container">
        <VenueTypeSelect
          :venueType="(venueType as string)"
          @update-venue-type-value="updateVenueTypeValue"
        />
      </div>
      <div class="s-fb-container">
        <FilterButton
          v-if="showsFilterButton"
          :venueType="(venueType as string)"
          :town="(town as string)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { EVenueType } from '../packages/core/enums/venue.type';
import type { Nullable } from '../packages/core/types/nullable';
import { ELocation } from '../packages/core/enums/location';
import { useApi } from '../composables/api/use.api';
import { asyncGlobalSpinner } from '@spaps/core/loading-worker';

const userStore = useUserStore();
const api = useApi();
const route = useRoute();
const showsFilterButton = ref(false);
const venueType: Ref<Nullable<string>> = ref(null);
const town: Ref<Nullable<string>> = ref(null);

const updateTownValue = async (selectedTown: string) => {
  town.value = selectedTown;

  if (userStore.user) {
    try {
      const [response] = await asyncGlobalSpinner(
        api.AuthorizationService.changeLocation({
          params: { location: selectedTown },
        })
      );

      if (response === 200) {
        userStore.updateUser({
          ...(userStore.user || {}),
          location: selectedTown,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const updateVenueTypeValue = (selectedVenueType: string) => {
  venueType.value = selectedVenueType;
  showsFilterButton.value = true;
};

onMounted(() => {
  const isSearchRoute = route.path === '/search';
  const routeQueryVenueType = route.query.venue_type;
  const routeQueryLocation = route.query.location;
  const hasValidVenueType =
    routeQueryVenueType &&
    Object.values(EVenueType).includes(routeQueryVenueType);
  const hasValidTown =
    routeQueryLocation && Object.values(ELocation).includes(routeQueryLocation);

  if (isSearchRoute && hasValidVenueType) {
    showsFilterButton.value = !showsFilterButton.value;
    venueType.value = routeQueryVenueType;
  }
  if (isSearchRoute && hasValidTown) {
    town.value = routeQueryLocation;
  } else if (userStore.user?.location) {
    town.value = userStore.user?.location;
  }
});
</script>
