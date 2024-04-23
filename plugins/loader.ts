import {
  createGlobalLoader,
  finishGlobalSpinner,
} from '../packages/core/loading-worker';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', createGlobalLoader);
  nuxtApp.hook('page:loading:end', finishGlobalSpinner);
});
