import {
  VApp,
  VDialog,
  VFileInput,
  VForm,
  VInput,
  VSelect,
  VTextField,
} from 'vuetify/components';
import { VDateInput } from 'vuetify/labs/VDateInput';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { uk } from 'vuetify/locale';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VApp,
      VDateInput,
      VDialog,
      VFileInput,
      VForm,
      VInput,
      VSelect,
      VTextField,
    },
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#0052A7',
            error: '#EB001B',
          },
        },
      },
    },
    locale: {
      locale: 'uk',
      fallback: 'uk',
      messages: { uk },
    },
  });
  app.vueApp.use(vuetify);
});
