import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import './assets/scss/main.scss'
import './assets/sass/style.sass'
import './assets/sass/interface.sass'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
