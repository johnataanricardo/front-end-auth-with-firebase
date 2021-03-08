<template>
  <div id="snackbar" lass="text-center ma-2">
    <v-snackbar v-model="snackbar.isVisible" shaped bottom multi-line>
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="closeSnackBar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Snackbar',
  computed: {
    snackbar() {
      return this.$store.state.GlobalModules.snackbar
    }
  },
  methods: {
    closeSnackBar() {
      this.$store.commit('closeSnackbar')
    },
  },
}
</script>