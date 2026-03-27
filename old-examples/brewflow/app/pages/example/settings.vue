<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-cog</v-icon>
            <h1 class="text-h4">Settings</h1>
          </v-card-title>
          <v-card-text>
            <p class="text-subtitle-1 mb-6">Manage your application preferences</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Profile Settings -->
    <v-row class="mt-4">
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-account</v-icon>
            Profile Settings
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="profileSettings.username"
                label="Username"
                prepend-icon="mdi-account"
                readonly
                variant="outlined"
                class="mb-3"
              />

              <v-text-field
                v-model="profileSettings.email"
                label="Email"
                prepend-icon="mdi-email"
                type="email"
                variant="outlined"
                class="mb-3"
              />

              <v-text-field
                v-model="profileSettings.fullName"
                label="Full Name"
                prepend-icon="mdi-account-circle"
                variant="outlined"
                class="mb-3"
              />

              <v-btn
                color="primary"
                :loading="loadingProfile"
                @click="saveProfile"
              >
                Save Profile
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Application Settings -->
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-application-settings</v-icon>
            Application Settings
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-select
                v-model="appSettings.theme"
                :items="themeOptions"
                label="Theme"
                prepend-icon="mdi-palette"
                variant="outlined"
                class="mb-3"
              />

              <v-select
                v-model="appSettings.language"
                :items="languageOptions"
                label="Language"
                prepend-icon="mdi-translate"
                variant="outlined"
                class="mb-3"
              />

              <v-switch
                v-model="appSettings.notifications"
                label="Enable Notifications"
                color="primary"
                class="mb-3"
              />

              <v-switch
                v-model="appSettings.autoSave"
                label="Auto Save"
                color="primary"
                class="mb-3"
              />

              <v-btn
                color="primary"
                :loading="loadingApp"
                @click="saveAppSettings"
              >
                Save Settings
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Security Settings -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-security</v-icon>
            Security Settings
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <h3 class="text-h6 mb-4">Change Password</h3>
                <v-form ref="passwordForm">
                  <v-text-field
                    v-model="passwordSettings.currentPassword"
                    label="Current Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    variant="outlined"
                    class="mb-3"
                    :rules="[rules.required]"
                  />

                  <v-text-field
                    v-model="passwordSettings.newPassword"
                    label="New Password"
                    prepend-icon="mdi-lock-plus"
                    type="password"
                    variant="outlined"
                    class="mb-3"
                    :rules="[rules.required, rules.minLength]"
                  />

                  <v-text-field
                    v-model="passwordSettings.confirmPassword"
                    label="Confirm New Password"
                    prepend-icon="mdi-lock-check"
                    type="password"
                    variant="outlined"
                    class="mb-3"
                    :rules="[rules.required, rules.passwordMatch]"
                  />

                  <v-btn
                    color="warning"
                    :loading="loadingPassword"
                    @click="changePassword"
                  >
                    Change Password
                  </v-btn>
                </v-form>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <h3 class="text-h6 mb-4">Two-Factor Authentication</h3>
                <v-switch
                  v-model="securitySettings.twoFactorAuth"
                  label="Enable Two-Factor Authentication"
                  color="primary"
                  class="mb-3"
                />

                <v-switch
                  v-model="securitySettings.sessionTimeout"
                  label="Auto Logout (30 minutes)"
                  color="primary"
                  class="mb-3"
                />

                <v-btn
                  color="primary"
                  :loading="loadingSecurity"
                  @click="saveSecuritySettings"
                >
                  Save Security Settings
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Danger Zone -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card border="error">
          <v-card-title class="text-error">
            <v-icon class="mr-2">mdi-alert</v-icon>
            Danger Zone
          </v-card-title>
          <v-card-text>
            <p class="mb-4">These actions cannot be undone. Please be careful.</p>

            <v-btn
              color="error"
              variant="outlined"
              class="mr-2"
              @click="showDeleteDialog = true"
            >
              <v-icon class="mr-2">mdi-delete</v-icon>
              Delete Account
            </v-btn>

            <v-btn
              color="warning"
              variant="outlined"
              @click="resetSettings"
            >
              <v-icon class="mr-2">mdi-refresh</v-icon>
              Reset All Settings
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Delete Confirmation Dialog -->
    <v-dialog
      v-model="showDeleteDialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-error">
          <v-icon class="mr-2">mdi-alert</v-icon>
          Confirm Account Deletion
        </v-card-title>
        <v-card-text>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <p class="text-caption mt-2">Type "DELETE" to confirm:</p>
          <v-text-field
            v-model="deleteConfirmation"
            variant="outlined"
            class="mt-2"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn
            color="error"
            :disabled="deleteConfirmation !== 'DELETE'"
            @click="deleteAccount"
          >
            Delete Account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      timeout="3000"
    >
      {{ snackbarMessage }}
      <template #actions>
        <v-btn
          variant="text"
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Notification Test Section -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">mdi-bell-ring</v-icon>
            Notification Test Center
          </v-card-title>
          <v-card-subtitle>
            Test the new dark pastel color scheme for notifications
          </v-card-subtitle>
          <v-card-text> <v-row>
              <v-col
                v-for="notificationType in notificationTypes"
                :key="notificationType.type"
                cols="12"
                md="3"
              >
                <v-btn
                  :color="notificationType.color"
                  :prepend-icon="notificationType.icon"
                  variant="tonal"
                  block
                  class="mb-2"
                  @click="testNotification(notificationType)"
                >
                  {{ notificationType.label }}
                </v-btn>
              </v-col>
            </v-row>

            <v-divider class="my-4" />

            <!-- Custom notification test -->
            <v-row class="mt-4">
              <v-col cols="12">
                <h3 class="text-h6 mb-3">Custom Notification Test</h3>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="customNotification.message"
                      label="Custom Message"
                      prepend-icon="mdi-message-text"
                      variant="outlined"
                      class="mb-3"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-select
                      v-model="customNotification.type"
                      :items="notificationTypes"
                      item-title="label"
                      item-value="type"
                      label="Notification Type"
                      prepend-icon="mdi-palette"
                      variant="outlined"
                      class="mb-3"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    md="3"
                  >
                    <v-btn
                      color="secondary"
                      prepend-icon="mdi-send"
                      block
                      @click="sendCustomNotification"
                    >
                      Send Custom
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script
  setup
  lang="ts"
>
// Apply authentication middleware
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

// Form refs
const passwordForm = ref()

// Loading states
const loadingProfile = ref(false)
const loadingApp = ref(false)
const loadingPassword = ref(false)
const loadingSecurity = ref(false)

// Dialog states
const showDeleteDialog = ref(false)
const deleteConfirmation = ref('')

// Snackbar
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')

// Profile Settings
const profileSettings = ref({
  username: user.value?.username || 'demo',
  email: 'demo@example.com',
  fullName: 'Demo User'
})

// Application Settings
const appSettings = ref({
  theme: 'dark',
  language: 'en',
  notifications: true,
  autoSave: true
})

const themeOptions = [
  { title: 'Light', value: 'light' },
  { title: 'Dark', value: 'dark' },
  { title: 'Auto', value: 'auto' }
]

const languageOptions = [
  { title: 'English', value: 'en' },
  { title: 'Italian', value: 'it' },
  { title: 'Spanish', value: 'es' },
  { title: 'French', value: 'fr' }
]

// Password Settings
const passwordSettings = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Security Settings
const securitySettings = ref({
  twoFactorAuth: false,
  sessionTimeout: true
})

// Validation rules
const rules = {
  required: (value: string) => !!value || 'Required field',
  minLength: (value: string) => value.length >= 8 || 'Password must be at least 8 characters',
  passwordMatch: (value: string) => value === passwordSettings.value.newPassword || 'Passwords do not match'
}

// Notification Test Data
const notificationTypes = ref([
  {
    type: 'success',
    label: 'Success',
    color: 'success',
    icon: 'mdi-check-circle',
    message: 'Operation completed successfully!'
  },
  {
    type: 'error',
    label: 'Error',
    color: 'error',
    icon: 'mdi-alert-circle',
    message: 'An error occurred while processing your request'
  },
  {
    type: 'warning',
    label: 'Warning',
    color: 'warning',
    icon: 'mdi-alert',
    message: 'Please review your settings before continuing'
  },
  {
    type: 'info',
    label: 'Info',
    color: 'info',
    icon: 'mdi-information',
    message: 'Here is some useful information for you'
  }
])

const customNotification = ref({
  message: 'This is a custom notification message',
  type: 'success'
})

// Methods
const saveProfile = async () => {
  loadingProfile.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  showNotification('Profile saved successfully!', 'success')
  loadingProfile.value = false
}

const saveAppSettings = async () => {
  loadingApp.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  showNotification('Application settings saved!', 'success')
  loadingApp.value = false
}

const changePassword = async () => {
  const { valid } = await passwordForm.value.validate()
  if (!valid) return

  loadingPassword.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Reset form
  passwordSettings.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  showNotification('Password changed successfully!', 'success')
  loadingPassword.value = false
}

const saveSecuritySettings = async () => {
  loadingSecurity.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  showNotification('Security settings saved!', 'success')
  loadingSecurity.value = false
}

const resetSettings = async () => {
  // Reset to defaults
  appSettings.value = {
    theme: 'dark',
    language: 'en',
    notifications: true,
    autoSave: true
  }

  securitySettings.value = {
    twoFactorAuth: false,
    sessionTimeout: true
  }

  showNotification('Settings reset to defaults!', 'info')
}

const deleteAccount = () => {
  // In a real app, this would make an API call
  showNotification('Account deletion would be processed here', 'error')
  showDeleteDialog.value = false
  deleteConfirmation.value = ''
}

// Notification Test Functions
const testNotification = (notificationType: { message: string; color: string }) => {
  showNotification(notificationType.message, notificationType.color)
}

const sendCustomNotification = () => {
  const selectedType = notificationTypes.value.find(type => type.type === customNotification.value.type)
  if (selectedType) {
    showNotification(customNotification.value.message, selectedType.color)
  }
}

const showNotification = (message: string, color: string) => {
  snackbarMessage.value = message
  snackbarColor.value = color
  showSnackbar.value = true
}
</script>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}
</style>
