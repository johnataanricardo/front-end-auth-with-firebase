import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3FB984',
        secondary: '#31475E'
      },
    },
  },
})

export default vuetify