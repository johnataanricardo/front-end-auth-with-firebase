export default {
  state: {
    isVisible: false,
    message: '',
    timeout: 4000
  },
  mutations: {
    openSnackbar(state, {message, timeout}) {
      state.isVisible = true
      state.message = message
      state.timeout = timeout
    },
    closeSnackbar(state) {
      state.isVisible = false
    }
  }
}