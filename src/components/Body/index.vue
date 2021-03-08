<template>
  <v-main id="main">
    <AppToolbar v-if="isAuthenticated"/>
    <transition name="fade" mode="out-in">
      <router-view style="margin-top: 64px"/>
    </transition>
    <Snackbar/>
  </v-main>
</template>

<script>
export default {
  name: 'Body',
  components: {
    AppToolbar: () => import('@/components/app/Toolbar'),
    Snackbar: () => import('@/components/Snackbar'),
  },
  computed: {
    isAuthenticated() {
      let isAuthenticated = this.$store.state.GlobalModules.auth.isAuthenticated
      return isAuthenticated
    }
  }
}
</script>