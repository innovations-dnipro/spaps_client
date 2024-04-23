import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast);
});

//NOTE: keep the following comments until the other solution proves working after deployment.

// import * as toast from 'vue-toastification';

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(toast.default);

//   return {
//     provide: {
//       toast: toast.useToast(),
//     },
//   };
// });

//NOTE: usage:
// const { $toast } = useNuxtApp()
// $toast.success('Something')
