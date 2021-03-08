import Vue from 'vue'
import store from '@/store'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import SignIn from '@/views/app/SignIn/index.vue'
import SignUp from '@/views/app/SignUp/index.vue'
import Home from '@/views/app/Home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'SignIn',
    component: SignIn,
    meta: {
      title: 'Sign In',
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
    meta: {
      title: 'Sign Up',
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (currentUser) { store.commit('setIsAuthenticated', true) }
  
  if (requiresAuth && !currentUser) {
    return next({ path: '/'})
  } else if (!requiresAuth && currentUser) {
    return next({ path: '/home'})
  } else {
    return next()
  }
})

export default router