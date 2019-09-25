<template>
  <div class="auth">
    <div class="auth-modal">
      <span class="close-modal" @click="closeModal"></span>
      <div class="auth-modal__title">
        {{ title }}
      </div>
      <form action="" class="auth-modal__form">
        <div class="auth-modal_inputs">
          <input required  class="auth-modal__input" v-model="formData.email" type="email" placeholder="E-mail">
        </div>
        <div>
          <label><input v-model="formData.partnerType" type="radio" value="4">Эконом</label>
          <label><input v-model="formData.partnerType" type="radio" value="3">Премиум</label>
          <label><input v-model="formData.partnerType" type="radio" value="2">VIP</label>
        </div>
        <button :disabled="formData.email.length < 5" type="button" @click="send" class="btn-default big purple" >Отправить</button>
        <p v-if="sendStatus != ''" class="return-message" :class="sendStatus">{{ sendMessage }}</p>
      </form>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      title: 'Отправить приглашение',
      sendMessage: '',
      sendStatus: '',
      formData: {
        email: '',
        partnerType: 4
      }
    }
  },
  methods: {
    ...mapActions(['sendInvite']),
    addTitle(title) {
      this.$emit('showTitle', title)
    },
    closeModal(){
      this.$emit('closeModal')
    },
    send (email){
      if (this.formData.email != null) {
        console.log(this.formData.email)
        if (this.sendInvite(this.formData)) {
          this.sendStatus = 'success'
          this.sendMessage = 'Приглашение успешно отправлено!'
        }
      }
      else {
        this.sendStatus = 'error'
        this.sendMessage = 'Ошибка отправки приглашения!'
      }
      // this.$store.dispatch('addPartner', email)
      console.log(this.sendStatus)
    },
    addPartner(){
      this.partnersInfo.push({
        id: this.partnersInfo.length + 1,
        photo: '',
        name: '',
        city: '',
        socials: {
          vk: '',
          instagram: '',
          telegram: '',
          whatsapp: ''
        }
      })
    }
  },
  mounted() {
    this.addTitle('')
  }
}
</script>
