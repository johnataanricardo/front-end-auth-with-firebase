<template>
  <v-container class="fill-height sign-in-card" fluid>
    <v-row justify="center">
      <v-flex>
        <v-card class="mx-auto elevation-0" max-width="400">
          <!-- Logo -->
          <v-card-title class="logo">
            <img src="../../../assets/logos/vue.png" height="150">
          </v-card-title>
          <!-- Form -->
          <v-form class="form" ref="form" v-model="valid" @keyup.native.enter="submit" lazy-validation>
            <!-- Email -->
            <v-text-field label="E-mail" 
              v-model="user.email"
              :rules="rules.email"
              @keypress="blockWhiteSpace"
              rounded solo single-line prepend-inner-icon="mdi-account" required/>
            <!-- Password -->
            <v-text-field label="Password" 
              v-model="user.password"
              :rules="rules.password"
              :append-icon="invisibility ? 'mdi-eye-off' : 'mdi-eye'"
              :type="invisibility ? 'password' : 'text'" 
              @click:append="() => (invisibility = !invisibility)"
              rounded solo single-line prepend-inner-icon="mdi-key" required/>
          </v-form>
          <!-- Submit Form -->
          <v-card-actions class="center">
            <v-btn class="submit-button primary" rounded large @click="submit">
              <v-progress-circular color="white" v-if="progress" indeterminate></v-progress-circular>
              <div class="text-white" v-else>Sign In</div>
            </v-btn>
          </v-card-actions>
          <!-- Sign Up -->
          <div class="row justify-center sign-up">
            <span>Don't have an account ?</span>
            <a @click="changeRoute('sign-up')">Sign Up</a>
          </div>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      valid: true,
      invisibility: true,    
      user: {
        email: '',
        password: '',
      },
      progress: false,
      rules: {
        email: [
          v => {
            const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
            if (v.length) {
              return pattern.test(v) || 'E-mail invalid!'            
            } else {
              return 'E-mail is required!'
            }
          }
        ],
        password: [
          v => !!v || 'Password is required!'
        ]
      }
    }
  },
  methods: {
    blockWhiteSpace() {
      if (event.keyCode == 32) {
        event.preventDefault();
      }
    },
    submit() {      
      const data = this
      if (this.$refs.form.validate()) {
        data.progress = true
        this.$store.dispatch('signIn', {...this.user}).then(() => {
          data.progress = false
        })
      }
    },
    changeRoute(router) {
      this.$router.push(router)
    }
  }
}
</script>

<style scoped src='./style/index.css'/>