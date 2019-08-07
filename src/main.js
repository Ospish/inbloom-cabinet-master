import Vue from 'vue'
import './assets/scss/main.scss'
import './assets/css/reset.css'
import './assets/sass/style.sass'
import './assets/sass/interface.sass'
import App from './App.vue'
import router from './router'
import store from './store/'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVk, faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faInstagram, faVk, faTelegram, faWhatsapp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
