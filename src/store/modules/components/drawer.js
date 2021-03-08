export default {
  state: {
    show: false
  },
  mutations: {
    setDrawer(state, payload) {
      state.show = payload
    },
    toggleDrawer(state) {
      state.show = !state.show
    }
  }
}
