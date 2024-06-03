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
    class="s-name-select"
    dense
    density="compact"
    color="primary"
  >
    <template v-slot:append-inner>
      <div class="s-name-select-inner-icon">
        <i class="ph ph-magnifying-glass"></i>
      </div>
    </template>
  </v-autocomplete>
</template>
