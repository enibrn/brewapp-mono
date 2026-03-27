import { computed } from 'vue';
import { defineStore } from 'pinia';
import type { Models } from 'appwrite';
import AppwriteService from '@/utils/appwrite';

export const useMySessionStore = defineStore('mySessionStore', () => {
  const appwrite = new AppwriteService();
  const current: globalThis.Ref<undefined | Models.Session> = useState(undefined);

  const isAuthenticated = computed<boolean>(() => {
    return current.value !== undefined;
  });

  function createByEmailPassword(
    email: string,
    password: string,
  ) {
    return appwrite.account
      .createEmailPasswordSession(email, password)
      .then((response) => {
        current.value = response;
      });
  }

  function destroyCurrent() {
    return appwrite.account.deleteSession('current').then(() => {
      resetCurrent();
    });
  }

  function resetCurrent() {
    current.value = undefined;
  }

  function init(): Promise<boolean> {
    return appwrite.account
      .getSession('current')
      .then((response) => {
        current.value = response;
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  return {
    current,
    isAuthenticated,
    init,
    createByEmailPassword,
    destroyCurrent,
    resetCurrent,
  };
});
