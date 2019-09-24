<template>
  <div class="auth">
    <div class="auth-modal">
      <div class="auth-modal__title">
        {{ title }}
      </div>
      <form action="" class="auth-modal__form">
        <div class="auth-modal_inputs">
          <input class="auth-modal__input" v-model="email" type="email" placeholder="E-mail">
        </div>
        <button @click="send" class="btn-default big purple" >Отправить</button>
        <p v-if="sendStatus != ''" class="return-message" :class="sendStatus">{{ sendMessage }}</p>
      </form>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      title: 'Сбросить пароль',
      sendMessage: '',
      sendStatus: '',
      email: null
    }
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', title)
    },
    send(){
      if (this.email != null) {

        this.sendStatus = 'success'
        this.sendMessage = 'Пароль успешно сброшен!'
      }
      else {
        this.sendStatus = 'error'
        this.sendMessage = 'Ошибка сброса пароля!'
      }
      console.log(this.sendStatus)
    }
  },
  mounted() {
    this.addTitle('')
  }
}
</script>
