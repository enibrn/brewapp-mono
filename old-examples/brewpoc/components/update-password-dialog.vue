<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        class="mb-2"
        color="primary"
        dark
        v-bind="props"
      >
        Update
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Update password</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="oldPasswordLocal"
                label="Old password"
                type="password"
                autocomplete="new-password"
                :error-messages="errors.errors['oldPassword']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newPasswordLocal"
                label="New password"
                type="password"
                autocomplete="new-password"
                :error-messages="errors.errors['newPassword']"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-label style="color: rgb(var(--v-theme-error));">
                {{ errors.otherErrorMessage }}
              </v-label>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script
  setup
  lang="ts"
>
import { ParsedError } from '@/utils/errors';

const accountStore = useMyAccountStore();

const dialog = ref(false);

const oldPasswordLocal = ref('');
const newPasswordLocal = ref('');

const errors = ref<ParsedError>(new ParsedError());

const close = () => {
  oldPasswordLocal.value = '';
  newPasswordLocal.value = '';
  errors.value = new ParsedError();
  dialog.value = false;
};

const save = async () => {
  errors.value = new ParsedError();

  if (!oldPasswordLocal.value) {
    errors.value.addError('oldPassword', 'Old password is required');
  }

  if (!newPasswordLocal.value) {
    errors.value.addError('newPassword', 'New password is required');
  }

  if (errors.value.hasErrors()) {
    return;
  }

  try {
    await accountStore.updatePassword(newPasswordLocal.value, oldPasswordLocal.value);
  } catch (e) {
    errors.value = ErrorUtils.parseError(e);
    return;
  }

  dialog.value = false;
};
</script>
