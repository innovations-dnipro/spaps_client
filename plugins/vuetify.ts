import { VApp, VForm, VInput, VTextField } from 'vuetify/components';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components: {
      VApp,
      VForm,
      VInput,
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
  });
  app.vueApp.use(vuetify);
});
