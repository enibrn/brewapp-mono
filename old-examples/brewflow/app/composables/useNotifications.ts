export const useNotifications = () => {
  const showSnackbar = useState('notifications.showSnackbar', () => false);
  const snackbarMessage = useState('notifications.message', () => '');
  const snackbarColor = useState('notifications.color', () => 'success');
  const snackbarTimeout = useState('notifications.timeout', () => 4000);

  const showNotification = (message: string, color: string = 'success', timeout: number = 4000) => {
    snackbarMessage.value = message;
    snackbarColor.value = color;
    snackbarTimeout.value = timeout;
    showSnackbar.value = true;
  };

  const hideNotification = () => {
    showSnackbar.value = false;
  };

  const showSuccess = (message: string, timeout?: number) => {
    showNotification(message, 'success', timeout);
  };

  const showError = (message: string, timeout?: number) => {
    showNotification(message, 'error', timeout);
  };

  const showWarning = (message: string, timeout?: number) => {
    showNotification(message, 'warning', timeout);
  };

  const showInfo = (message: string, timeout?: number) => {
    showNotification(message, 'info', timeout);
  };

  return {
    showSnackbar: readonly(showSnackbar),
    snackbarMessage: readonly(snackbarMessage),
    snackbarColor: readonly(snackbarColor),
    snackbarTimeout: readonly(snackbarTimeout),
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
