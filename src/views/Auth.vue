<template v-if="$route.params.id === 'auth'">
  <div class="auth">
    <div id="loading" v-if="loading">
      <img src="../assets/img/loading.gif" alt="">
    </div>
    <div class="auth-modal">
      <div class="auth-modal__title" v-if="action == 'auth'">
        {{ authStrings.title }}
      </div>
      <div class="auth-modal__title" v-else-if="action == 'reg'">
        {{ regStrings.title }}
      </div>
      <div class="auth-modal__title" v-else-if="action == 'restorePass'">
        {{ restoreStrings.title }}
      </div>
      <form id="form" @submit="submit()" class="auth-modal__form">
        <div class="auth-modal_inputs">
          <input required class="auth-modal__input" name="email" type="email" placeholder="E-mail">
          <input :required="action == 'reg' || action == 'auth'" class="auth-modal__input" name="pass" type="password" placeholder="Пароль" v-if="action == 'reg' || action == 'auth'">
          <input :required="action == 'reg'" class="auth-modal__input" name="passConfirm" type="password" placeholder="Подтверждение пароля" v-if="action == 'reg'">
          <input :required="action == 'reg'" class="auth-modal__input" name="invite" type="text" placeholder="Код приглашения" v-if="action == 'reg'">
        </div>
        <div class="auth-links" v-if="action == 'auth'">
          <a @click="changeAction(link[1])" v-for="link in authStrings.links" :key="link.id">{{ link[0] }}</a>
        </div>
        <div class="auth-links" v-else-if="action == 'reg'">
          <a @click="changeAction(regStrings.linksVal[0])">{{ regStrings.linksText[0] }}</a>
          <a @click="changeAction(regStrings.linksVal[1])">{{ regStrings.linksText[1] }}</a>
        </div>
        <div class="auth-links" v-else-if="action == 'restorePass'">
          <a @click="changeAction(restoreStrings.linksVal[0])">{{ restoreStrings.linksText[0] }}</a>
          <a @click="changeAction(restoreStrings.linksVal[1])">{{ restoreStrings.linksText[1] }}</a>
        </div>
        <button class="btn-default big purple" v-if="action == 'auth'">Войти</button>
        <button class="btn-default big purple"  v-else-if="action == 'reg'">Зарегистрироваться</button>
        <button id="reset" class="btn-default big purple" v-else-if="action == 'restorePass'">Восстановить</button>
        <p v-if="sendStatus != ''" class="return-message" :class="sendStatus">{{ sendMessage }}</p>
      </form>
    </div>
    <Reset v-if="$route.params.id === 'reset'" @showTitle="showTitle"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Reset from '@/pages/Reset.vue'

export default {
  name: 'Auth',
  components: { Reset },
  data () {
    return {
      email: null,
      action: 'auth',
      info: null,
      info1: null,
      sendMessage: '',
      sendStatus: '',
      authStrings: {
        title: 'Войти в личный кабинет',
        links: [['Забыли пароль?', 'restorePass'], ['Зарегистрироваться', 'reg']]
      },
      regStrings: {
        title: 'Регистрация',
        linksText: ['Войти', 'Забыли пароль?'],
        linksVal: ['auth', 'restorePass']
      },
      restoreStrings: {
        title: 'Восстановление пароля',
        linksText: ['Войти', 'Зарегистрироваться'],
        linksVal: ['auth', 'reg']
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['checkAuth', 'login', 'reg', 'restorePass']),
    changeAction: function (action) {
      this.action = action;
    },
    submit() {
      event.preventDefault()
      this.loading = true
      var self = this
      setTimeout(function (){
        self.loading = false
      }, 2000)
      if (this.action == 'reg') this.reg()
      if (this.action == 'auth') this.login()
      if (this.action == 'restorePass') this.reset()
    },
    reset() {
      if (form.email.value != '') {
        this.sendStatus = 'success'
        this.sendMessage = 'Пароль успешно сброшен!'
        reset.setAttribute("disabled", true);
        this.restorePass();
      }
      else {
        this.sendStatus = 'error'
        this.sendMessage = 'Ошибка сброса пароля!'
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  created () {
    /*
    if (this.$route.params.token == '24ad13sf' ) {
      this.$store.commit('updateEmail', this.$route.params.email)
      this.login()
    }
     */
    this.checkAuth()
  }
}
</script>

<style lang="sass">
  #loading
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 6em
    padding: 1em
    z-index: 10
    background-color: #fff
    border-radius: .5em
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)
    img
      width: 4em
      height: 4em
</style>
