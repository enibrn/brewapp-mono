export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  // If the user is not authenticated and trying to access a protected page
  if (!isLoggedIn.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // If the user is authenticated and trying to access the login page
  if (isLoggedIn.value && to.path === '/login') {
    return navigateTo('/')
  }
})
