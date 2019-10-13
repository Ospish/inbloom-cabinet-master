<template>
  <form @change="inputChanged = false" class="personal-data__form" action="">
    <input v-if="this.tabname != 'password'" class="personal-data__input" type="password" name="old-pass" placeholder="Введите старый пароль">
    <input class="personal-data__input" type="password" v-model="newPass" placeholder="Введите новый пароль">
    <input class="personal-data__input" type="password" v-model="passCheck" placeholder="Повторите пароль">
    <p class="small">*не менее 8 символов</p>
    <div class="profile_save-changes">
      <button type="button" class="btn-default big gray">Отмена</button>
      <button type="button" @click="changePassword(newPass)" :disabled="inputChanged || badPwd" class="btn-default big purple-orange">Сохранить пароль</button>
    </div>
    <p class="small green" v-if="inputChanged">Пароль сохранён!</p>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Password',
  props: ['tabname'],
  data() {
    return {
      newPass: '',
      inputChanged: false,
      passCheck: '',
    }
  },
  computed: {
    badPwd() {
      if ((this.newPass.length > 7) && (this.passCheck.length > 7)) return false
      else return true
    }
  },
  methods: {
    ...mapActions(['changePwd']),
    changePassword(newPass){

      this.changePwd(newPass)
      this.inputChanged = true
    },
  }
}
</script>

<style lang="sass" scoped>
  .personal-data__form .small
    margin-top: 1em
    display: block
    &.green
      color: green
      text-align: right
      padding-right: 1.5em
</style>
