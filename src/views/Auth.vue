<template>
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
      <form action="" class="auth-modal__form">
        <div class="auth-modal_inputs">
          <input class="auth-modal__input" name="email" type="email" placeholder="E-mail">
          <input class="auth-modal__input" name="pass" type="password" placeholder="Пароль" v-if="action == 'reg' || action == 'auth'">
          <input class="auth-modal__input" name="passConfirm" type="password" placeholder="Подтверждение пароля" v-else-if="action == 'reg'">
          <input class="auth-modal__input" name="referalCode" type="text" placeholder="Код приглашения" v-else-if="action == 'reg'">
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
        <button type="submit" class="btn-default big purple" @click="auth" v-if="action == 'auth'">{{ authStrings.btnVal }}</button>
        <button type="submit" class="btn-default big purple" v-else-if="action == 'reg'">{{ regStrings.btnVal }}</button>
        <button type="submit" class="btn-default big purple" v-else-if="action == 'restorePass'">{{ restoreStrings.btnVal }}</button>
                <p v-if="errorMessage != null" class="return-message error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import axios from 'axios';

export default {
  name: 'Auth',
  data () {
    return {
      action: 'auth',
      info: null,
      info1: null,
      errorMessage: null,
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
    ...mapActions(['checkAuth']),
    routing() {
      if (this.isLoginned === true) this.$router.push('/home');
    },
    changeAction: function(action) {
      this.action = 'restorePass';
      this.action = action;
    },
    auth(){
      axios
      .get('http://ibapi.fobesko.com/public/login')
      .then(response => (this.info = response));
      axios
        .post('http://ibapi.fobesko.com/public/login', {
          email: 'example@gmail.com',
          password: 'asdasdasdasd'
        })
        .then(response => (this.info1 = response))
        .catch(function (error) {
          console.log(error);
        },
          this.errorMessage = 'Ошибка!')
    }
  },
  computed: mapGetters(['isLoginned']),
  created() {
    this.checkAuth();
    this.routing();
  }
}
</script>
