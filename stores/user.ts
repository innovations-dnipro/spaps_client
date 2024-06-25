import { defineStore } from 'pinia';
import type { Nullable } from '../packages/core/types/nullable';

export const useUserStore = defineStore('userData', () => {
  const user: Ref<Nullable<{}>> = ref(null);

  const updateUser = (userData: object) => {
    user.value = userData;
  };

  return {
    user,
    updateUser,
  };
});
