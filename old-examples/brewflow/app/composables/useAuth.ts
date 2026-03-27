export const useAuth = () => {
  const user = useState<{ username: string; isGuest?: boolean } | null>('auth.user', () => null);
  const isLoggedIn = computed(() => !!user.value);
  const isGuest = computed(() => user.value?.isGuest === true);

  const login = async (username: string, password: string) => {
    // Authentication simulation - username and password must be "demo"
    if (username === 'demo' && password === 'demo') {
      user.value = { username: 'demo' };
      await navigateTo('/');
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };
  const loginAsGuest = async () => {
    user.value = { username: 'Guest', isGuest: true };
    await navigateTo('/');

    // Show welcome notification for guest users
    if (import.meta.client) {
      const { showInfo } = useNotifications();
      showInfo('Welcome! You are using the app as a guest. Your data will be saved locally.', 6000);
    }

    return { success: true };
  };

  const logout = async () => {
    user.value = null;
    await navigateTo('/login');
  };
  return {
    user: readonly(user),
    isLoggedIn,
    isGuest,
    login,
    loginAsGuest,
    logout
  };
};
