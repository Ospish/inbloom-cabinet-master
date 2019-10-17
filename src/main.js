import Vue from 'vue'
import './assets/css/reset.min.css'
import './assets/css/phonecode.css'
import './assets/scss/main.scss'
import './assets/sass/style.sass'
import './assets/sass/interface.sass'
import App from './App.vue'
import router from './router'
import store from './store/'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVk, faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import _ from 'lodash'

Object.defineProperty(Vue.prototype, '$_', { value: _ });

library.add(faInstagram, faVk, faTelegram, faWhatsapp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
