import { createApp, ref } from 'vue';
import loader from './Loader.vue';
import { LoaderManager } from './loader.manager';

declare const window;

const isLoading = ref(false);
const LoaderManagerInstance = new LoaderManager();
let timeout;

const startGlobalSpinner = (): void => {
  window.clearTimeout(timeout);
  isLoading.value = true;
};

const finishGlobalSpinner = (): void => {
  window.clearTimeout(timeout);
  isLoading.value = false;
};

const createGlobalLoader = (): void => {
  const div = document.createElement('div');
  div.id = 'loading';
  document.body.append(div);

  window['loading'] = createApp(loader, {
    isLoading: isLoading,
    type: 'global',
  }).mount('#loading');

  startGlobalSpinner();
};

const asyncSpinnerByName = <T>(name: string) => {
  return async (...promises: Promise<unknown>[]): Promise<unknown> => {
    let results;
    startSpinnerByName(name);
    try {
      results = await Promise.all(promises);
    } catch (e) {
      console.error('[asyncSpinnerByName]: request error', e);
      finishSpinnerByName(name);
      finishGlobalSpinner();
      throw new Error(e);
    }
    finishSpinnerByName(name);
    return results;
  };
};

const asyncGlobalSpinner = async (
  ...promises: Promise<unknown>[]
): Promise<unknown> => {
  startGlobalSpinner();
  let results;
  try {
    results = await Promise.all(promises);
  } catch (e) {
    console.error('[asyncGlobalSpinner]: request error', e);
    finishGlobalSpinner();
    throw new Error(e);
  }
  finishGlobalSpinner();

  return results;
};

const startSpinnerByName = (name: string): void => {
  LoaderManagerInstance.startSpinnerByName(name);
};
const finishSpinnerByName = (name: string): void => {
  LoaderManagerInstance.finishSpinnerByName(name);
};

export {
  LoaderManagerInstance,
  asyncGlobalSpinner,
  asyncSpinnerByName,
  createGlobalLoader,
  finishGlobalSpinner,
  finishSpinnerByName,
  startGlobalSpinner,
  startSpinnerByName,
};
