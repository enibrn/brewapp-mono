<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-table>
          <tbody>
            <tr>
              <td>Username</td>
              <td>{{ accountStore.current?.name }}</td>
              <td><update-name-dialog/></td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{{ accountStore.current?.email }}</td>
              <td><update-email-dialog/></td>
            </tr>
            <tr>
              <td>Password</td>
              <td></td>
              <td><update-password-dialog/></td>
            </tr>
            <tr>
              <td>Created at</td>
              <td>{{ createdAt }}</td>
              <td></td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :items="sessionsList?.sessions"
          :headers="headers"
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Sessions</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <v-btn
                class="mb-2"
                color="primary"
                dark
                @click="deleteSessions"
              >
                Delete all
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.current="{ item }">
            <div class="text-end">
              <v-chip
                v-if="item.current"
                color="green"
                text="Current"
                class="text-uppercase"
                size="small"
                label
              ></v-chip>
            </div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              size="small"
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script
  lang="ts"
  setup
>
import { useSessions } from '@/composables/useSessions';
import { type Session, type SessionList } from '@/types/sessionTypes';

definePageMeta({
  middleware: ['auth'],
});
useHead({
  title: 'Profile',
});

const accountStore = useMyAccountStore();
const sessions = useSessions();

const sessionsList = ref<SessionList | null>(null);

const headers = ref([
  { title: 'Client', key: 'client' },
  { title: 'OS', key: 'os' },
  { title: 'Device', key: 'device' },
  { title: 'Location', key: 'location' },
  { title: 'IP', key: 'ip' },
  { title: '', key: 'current' },
  { title: 'Actions', key: 'actions' },
]);

const createdAt = computed(() => {
  return accountStore.current?.$createdAt ? new Date(accountStore.current?.$createdAt).toLocaleString() : '';
});

onMounted(async () => {
  sessionsList.value = await sessions.list();
});

const deleteSessions = async () => {
  await sessions.deleteSessions();
  navigateTo("/login");
};

const deleteItem = async (item: Session) => {
  await sessions.deleteSession(item.id);
  if (item.current) {
    navigateTo("/login");
  } else {
    sessionsList.value = await sessions.list();
  }
};

</script>
