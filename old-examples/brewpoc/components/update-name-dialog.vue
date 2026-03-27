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
        <span class="text-h5">Update name</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="nameLocal"
                label="Name"
                :error-messages="errors.errors['name']"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-col cols="12">
            <v-label style="color: rgb(var(--v-theme-error));">
              {{ errors.otherErrorMessage }}
            </v-label>
          </v-col>
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
  lang="ts"
  setup
>
import { ParsedError } from '@/utils/errors';

const accountStore = useMyAccountStore();

const dialog = ref(false);

const nameLocal = ref(accountStore.current?.name);
const errors = ref<ParsedError>(new ParsedError());

const close = () => {
  nameLocal.value = accountStore.current?.name;
  errors.value = new ParsedError();
  dialog.value = false;
};

const save = async () => {
  errors.value = new ParsedError();

  if (!nameLocal.value) {
    errors.value.addError('name', 'Name is required');
    return;
  }

  try {
    await accountStore.updateName(nameLocal.value);
  } catch (e) {
    errors.value = ErrorUtils.parseError(e);
    return;
  }

  dialog.value = false;
};
</script>