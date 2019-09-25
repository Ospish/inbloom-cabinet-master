<template>
  <form @change="inputChanged = false" class="personal-data__form" action="">
    <input v-if="this.tabname != 'password'" class="personal-data__input" type="password" name="old-pass" placeholder="Введите старый пароль">
    <input class="personal-data__input" type="password" v-model="newPass" placeholder="Введите новый пароль">
    <input class="personal-data__input" type="password" v-model="passCheck" placeholder="Повторите пароль">
    <div class="profile_save-changes">
      <button type="button" class="btn-default big gray">Отмена</button>
      <button type="button" @click="changePassword(newPass)" :disabled="inputChanged || badPwd" class="btn-default big purple-orange">Сохранить пароль</button>
    </div>
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
      inputChanged = true
    },
  }
}
</script>
