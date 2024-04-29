import { uk } from './uk';

const i18n = defineI18nConfig(() => ({
  legacy: false,
  locale: 'uk',
  messages: {
    uk,
  },
}));

export default i18n;
