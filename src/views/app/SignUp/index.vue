<template>
  <v-container class="fill-height sign-up-card" fluid>
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
            <v-text-field label="E-mail" v-model="user.email" :rules="rules.email"
              @keypress="blockWhiteSpace" rounded solo single-line 
              prepend-inner-icon="mdi-gmail" required/>
            <!-- Password -->
            <v-text-field label="Password" 
              v-model="user.password"
              :rules="rules.password"
              :append-icon="invisibility ? 'mdi-eye-off' : 'mdi-eye'"
              :type="invisibility ? 'password' : 'text'"
              @click:append="() => (invisibility = !invisibility)"
              rounded solo single-line prepend-inner-icon="mdi-key" required/>
            <!-- Repeat Password -->
            <v-text-field label="Repeat Password" 
              v-model="user.confirmPassword"
              :rules="rules.confirmPassword"
              :append-icon="invisibility ? 'mdi-eye-off' : 'mdi-eye'"
              :type="invisibility ? 'password' : 'text'"
              @click:append="() => (invisibility = !invisibility)"
              rounded solo single-line prepend-inner-icon="mdi-key" required/>
          </v-form>
          <!-- Submit Form -->
          <v-card-actions class="center">
            <v-btn class="submit-button primary" rounded large @click="submit">
              <v-progress-circular color="white" v-if="progress" indeterminate></v-progress-circular>
              <div class="text-white" v-else>Sign Up</div>
            </v-btn>
          </v-card-actions>
          <!-- Sign In -->
          <div class="row justify-center sign-in">
            <span>Do you already have an account ?</span>
            <a @click="changeRoute('/')">Sign In</a>
          </div>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data() {
    return {
      valid: true,
      invisibility: true,    
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      progress: false,
      rules: {
        name: [
          v => !!v || 'Full name is required!'
        ],
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
          v => {
            const pattern = /^.{6,}$/
            if (v.length) {
              if (pattern.test(v)) {
                return true
              } else {
                return 'The password needs at least 6 characters!'
              }
            } else {
              return 'Password is required!'
            }
          }
        ],
        confirmPassword: [
          v => {
            if (v.length) {
              if (v != this.user.password) {
                return "The passwords don't match!"
              } else {
                return true
              }
            } else {
              return 'Repeat Password is required!'
            }
          }
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
        this.$store.dispatch('signUp', {...this.user}).then(() => {
          data.progress = false
        })
      }
    },
    changeRoute (router) {
      this.$router.push(router)
    }
  }
}
</script>

<style scoped src='./style/index.css'/>