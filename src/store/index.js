import Vue from 'vue'
import Vuex from 'vuex'
import GlobalModules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    GlobalModules
  }
})