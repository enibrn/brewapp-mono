import { useState } from '#app'
import { computed } from 'vue'

export function useAuth() {
  const user = useState('auth-user', () => null)
  const currentSession = useState('auth-session', () => null)
  const isAuthenticated = computed(() => user.value !== null)

  async function init() {
    const saved = localStorage.getItem('dummy-user')
    if (saved) {
      user.value = JSON.parse(saved)
      currentSession.value = { id: 'dummy-session' }
      return true
    }
    return false
  }

  async function login(email, password) {
    if (email === 'test@example.com' && password === 'password') {
      const u = { id: '1', email }
      user.value = u
      currentSession.value = { id: 'dummy-session' }
      localStorage.setItem('dummy-user', JSON.stringify(u))
      return { data: { user: u } }
    }
    return { error: 'Invalid credentials' }
  }

  async function logout() {
    user.value = null
    currentSession.value = null
    localStorage.removeItem('dummy-user')
    return { data: true }
  }

  async function signup(email, password) {
    const u = { id: '2', email }
    user.value = u
    currentSession.value = { id: 'dummy-session' }
    localStorage.setItem('dummy-user', JSON.stringify(u))
    return { data: { user: u } }
  }

  return {
    user,
    currentSession,
    isAuthenticated,
    init,
    login,
    logout,
    signup
  }
}
