import { defineStore } from 'pinia';

export const useUserStore = defineStore('userData', () => {
  const user = ref(null);

  const updateUser = (userData) => {
    user.value = userData;
  };

  return {
    user,
    updateUser,
  };
});
