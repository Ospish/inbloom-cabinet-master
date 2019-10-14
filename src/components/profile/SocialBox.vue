<template>
  <div class="social-table_row">
    <div class="social-box">
      <h3 class="social-box__title">{{ socialName() }}</h3>
      <div class="social-box__link">
        <span class="unactive-link">{{ socialURL() }}</span>
        <button @click="idEnter" class="social-box__link-btn" v-if="!socialEnter && !userSocials.ids[arraykey]">Введите ID</button>
        <input :placeholder="placeholder()" v-model="userSocials.ids[arraykey]" @input="onInput(arraykey)" type="text" v-if="socialEnter || userSocials.ids[arraykey]">
      </div>
    </div>
    <div class="swither">
      <input v-model="userSocials.active[arraykey]" type="checkbox" class="checkbox">
      <div class="knobs">
        <span>Нет</span>
        <span>Да</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['arraydata', 'arraykey'],
  computed: {
    ...mapGetters(['userSocials']),
    isActive (value) {
      if ( value == true ) return 1
      else return 0
    }
  },
  data () {
    return {
      socialEnter: false,
      isViewed: 0
    }
  },
  methods: {
    onInput(arraykey){
      if (this.userSocials.ids[arraykey] != '') {
        this.$store.commit('updateSocialsActive', [arraykey, 1])
        this.$forceUpdate()
      }
      else {
        this.$store.commit('updateSocialsActive', [arraykey, 0])
        this.$forceUpdate()
      }
    },
    idEnter () {
      this.socialEnter = true
    },
    socialName () {
      if (this.arraykey == 'vk') return 'ВКонтакте'
      if (this.arraykey == 'ok') return 'Одноклассники'
      if (this.arraykey == 'whatsapp') return 'WhatsApp'
      if (this.arraykey == 'telegram') return 'Telegram'
      if (this.arraykey == 'facebook') return 'Facebook'
      if (this.arraykey == 'instagram') return 'Instagram'
    },
    socialURL () {
      if (this.arraykey == 'vk') return 'https://vk.com/'
      if (this.arraykey == 'ok') return 'https://ok.ru/'
      if (this.arraykey == 'whatsapp') return 'https://wa.me/'
      if (this.arraykey == 'telegram') return 'https://t.me/'
      if (this.arraykey == 'facebook') return 'https://facebook.com/'
      if (this.arraykey == 'instagram') return 'https://instagram.com/'
    },
    placeholder () {
      if (this.arraykey == 'vk') return 'https://vk.com/'
      if (this.arraykey == 'ok') return 'https://ok.ru/'
      if (this.arraykey == 'whatsapp') return '7xxxxxxxxxx'
      if (this.arraykey == 'telegram') return 'https://t.me/'
      if (this.arraykey == 'facebook') return 'https://facebook.com/'
      if (this.arraykey == 'instagram') return 'https://instagram.com/'
    }
  }
}
</script>
