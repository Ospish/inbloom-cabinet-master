<template v-if="$route.params.id === 'auth'">
  <div class="auth">
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
      <form id="form" action="" class="auth-modal__form">
        <div class="auth-modal_inputs">
          <input class="auth-modal__input" name="email" type="email" placeholder="E-mail">
          <input class="auth-modal__input" name="pass" type="password" placeholder="Пароль" v-if="action == 'reg' || action == 'auth'">
          <input class="auth-modal__input" name="passConfirm" type="password" placeholder="Подтверждение пароля" v-if="action == 'reg'">
          <input class="auth-modal__input" name="invite" type="text" placeholder="Код приглашения" v-if="action == 'reg'">
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
        <button type="button" class="btn-default big purple" @click='login()'  v-if="action == 'auth'">{{ authStrings.btnVal }}</button>
        <button type="button" class="btn-default big purple" @click='reg()'  v-else-if="action == 'reg'">{{ regStrings.btnVal }}</button>
        <button type="button" class="btn-default big purple" @click='restorePass()'  v-else-if="action == 'restorePass'">{{ restoreStrings.btnVal }}</button>
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
      authStrings: {
        title: 'Войти в личный кабинет',
        btnVal: 'Войти',
        links: [['Забыли пароль?', 'restorePass'], ['Зарегистрироваться', 'reg']]
      },
      regStrings: {
        title: 'Регистрация',
        btnVal: 'Зарегистрироваться',
        linksText: ['Войти', 'Забыли пароль?'],
        linksVal: ['auth', 'restorePass']
      },
      restoreStrings: {
        title: 'Восстановление пароля',
        btnVal: 'Восстановить',
        linksText: ['Войти', 'Зарегистрироваться'],
        linksVal: ['auth', 'reg']
      }
    }
  },
  methods: {
    ...mapActions(['checkAuth', 'login', 'reg', 'restorePass']),
    changeAction: function (action) {
      this.action = action;
    }
  },
  computed: mapGetters(['isLoggedIn']),
  created () {
    if (this.$route.params.token == '24ad13sf' ) {
      this.$store.commit('updateEmail', this.$route.params.email)
      this.login(this.$route.params.id)
    }
    this.checkAuth()
  }
}
</script>
