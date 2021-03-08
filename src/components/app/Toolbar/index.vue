<template>
  <div>
    <!-- Toolbar -->
    <v-app-bar color="white" elevate-on-scroll fixed>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on" color="primary" @click="toggleDrawer"/>
        </template>
        <span>Menu</span>
      </v-tooltip>
      <v-toolbar-title>Firebase Auth Test</v-toolbar-title>
    </v-app-bar>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary app dark>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link color="primary">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-btn color="primary" @click="signOut" text dark block large>Sign Out</v-btn>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'Toolbar',
    data() {
      return {        
        items: [
          {
            to: '/home',
            title: 'Home', 
            icon: 'mdi-home'
          }
        ],
      }
    },
    computed: {
      drawer: {
        get() {
          return this.$store.state.GlobalModules.drawer.show
        },
        set(val) {
          this.$store.commit('setDrawer', val)
        }
      }
    },
    methods: {
      toggleDrawer() {
        this.$store.commit('toggleDrawer')
      },
      signOut() {     
        this.$store.commit('setDrawer', false) 
        this.$store.dispatch('signOut')
      },
    }
  }
</script>