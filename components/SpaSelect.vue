<template>
  <v-select
    class="s-sauna-search s-spa-select"
    :label="$t('spa_select_messages.select_spa_type')"
    :items="[
      'California',
      'Colorado',
      'Florida',
      'Georgia',
      'Texas',
      'Wyominsdfgsdfgdfgfdgd',
      'Лазня Гіппократа',
    ]"
  >
    <template v-slot:append-inner>
      <div class="s-spa-select-inner-icon">
        <img src="/arrow_filled_down.svg" alt="arrow_filled_down" />
      </div>
    </template>
  </v-select>
</template>
