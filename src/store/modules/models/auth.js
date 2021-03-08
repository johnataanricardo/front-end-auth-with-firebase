import router from '@/router'
import { signUp, signIn, signOut } from '@/service/firebase'

export default {
  state: {
    isAuthenticated: false
  },
  mutations: {
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    }
  },
  actions: {
    async signUp({commit}, user) {
      const response = await signUp(user)
      if (response.user) {
        commit('setIsAuthenticated', true)
        router.push('/home')
        commit('openSnackbar', {message: 'Successful registration!', timeout: 6000})
      } else if (response.code === 'auth/email-already-in-use') {
        commit('openSnackbar', {message: 'E-mail already registred!', timeout: 6000})
      } else {
        commit('openSnackbar', {message: 'Something get wrong, try again!', timeout: 6000})
      }
    },
    async signIn({commit}, user) {
      const response = await signIn(user)
      if (response.user) {
        commit('setIsAuthenticated', true)
        router.push('/home')
        commit('openSnackbar', {message: 'Welcome!', timeout: 6000})
      } else if (response.code === 'auth/wrong-password' || response.code === 'auth/user-not-found') {
        commit('openSnackbar', {message: 'Wrong e-mail or password!', timeout: 6000})
      } else {
        commit('openSnackbar', {message: 'Something get wrong, try again!', timeout: 6000})
      }
    },
    async signOut({commit}) {
      await signOut()
      commit('setIsAuthenticated', false)
      router.push('/')
      commit('openSnackbar', {message: 'Sign out successful!', timeout: 6000})
    }
  }
}