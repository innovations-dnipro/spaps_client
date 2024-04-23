import { appendPhIcons } from '../packages/core/icon-worker';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', appendPhIcons);
});
