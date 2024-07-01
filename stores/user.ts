import { defineStore } from 'pinia';
import type { Nullable } from '../packages/core/types/nullable';
import type { ERole } from '../packages/core/enums/role';

type Rentor = { id: number };
type Client = { id: number };
type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: ERole;
  rentors: Rentor[];
  clients: Client[];
};

export const useUserStore = defineStore('userData', () => {
  const user: Ref<Nullable<User>> = ref(null);

  const updateUser = (userData: User | null) => {
    user.value = userData;
  };

  return {
    user,
    updateUser,
  };
});
