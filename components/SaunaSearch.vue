<template>
  <v-autocomplete
    :items="[
      'California',
      'Colorado',
      'Florida',
      'Georgia',
      'Texas',
      'Wyoming',
    ]"
    :placeholder="$t('sauna_search_messages.find_by_name')"
    class="s-sauna-search"
    rounded
    dense
    density="compact"
  >
    <template v-slot:append-inner>
      <div class="s-sauna-search-inner-icon">
        <i class="ph ph-magnifying-glass"></i>
      </div>
    </template>
  </v-autocomplete>
</template>
