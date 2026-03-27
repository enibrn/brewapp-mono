import { defineStore } from 'pinia';
import { type Models, ID } from 'appwrite';
import AppwriteService from '@/utils/appwrite';

export const useMyAccountStore = defineStore('myAccountStore', () => {
  const appwrite = new AppwriteService();
  const current: globalThis.Ref<undefined | Models.User<Models.Preferences>> = useState(undefined);

  function get() {
    return current;
  }

  function createByEmailPassword(
    email: string,
    password: string,
    name: string,
  ): Promise<Models.User<Models.Preferences>> {
    return appwrite.account.create(ID.unique(), email, password, name);
  }

  function init(): Promise<boolean> {
    return appwrite.account
      .get()
      .then((response) => {
        current.value = response;
        return true;
      })
      .catch(() => {
        console.log('Unauthenticated!')
        return false;
      });
  }

  function destroy() {
    current.value = undefined;
  }

  async function updateEmail(email: string, password: string) {
    await appwrite.account.updateEmail(email, password);
    if (!current.value) return;
    current.value.email = email;
  }

  async function updateName(name: string) {
    await appwrite.account.updateName(name);
    if (!current.value) return;
    current.value.name = name;
  }

  async function updatePassword(password: string, oldPassword: string) {
    await appwrite.account.updatePassword(password, oldPassword);
  }

  return {
    current,
    get,
    init,
    createByEmailPassword,
    destroy,
    updateEmail,
    updateName,
    updatePassword,
  };
});
