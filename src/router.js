import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import store from '@/store'

Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    { path: '/home/:id', component: Home
    },
    { path: '/home/:id/:tab', component: Home },
    { path: '/auth/:token/:id', component: Auth }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {next({ name: "auth" })}
  if (to.fullPath != '/auth') {
    if (store.getters.isLoggedIn) {
      if (to.fullPath == '/home') {
        setTimeout(function () { next() }, 1600)
      }
      else next()
    }
    else {
      if (to.fullPath.includes('2413fdsa')) {
        var n = to.fullPath.lastIndexOf('/');
        var result = to.fullPath.substring(n + 1);

        store.dispatch('login', result)
      }
      else next({ name: "auth" });
    }
  }
  else next()
})
export default router
