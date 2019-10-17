<template>
  <form @change="inputChanged = false" class="personal-data__form" action="">
    <div class="social-table">
      <div class="social-table_row">
        <p>Отображать:</p>
      </div>
      <SocialBox v-for="(item, index) in userSocials.ids" :key="index" :arraydata="item" :arraykey="index" />
    </div>
    <div class="profile_save-changes">
      <button type="button" class="btn-default big gray">Отмена</button>
      <button type="button" @click="saveSocials()" :disabled="inputChanged" class="btn-default big purple-orange">Сохранить соцсети</button>
    </div>
  </form>
</template>

<script>

import SocialBox from '@/components/profile/SocialBox.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Social',
  computed: {
    ...mapGetters(['userSocials'])
  },
  components: {
    SocialBox
  },
  mounted () {
  },
  data(){
    return {
      inputChanged: false
    }
  },
  methods: {
    saveSocials () {
      this.$store.dispatch('setSocials', {ids: this.userSocials.ids, active: this.userSocials.active})
      this.inputChanged = true
    }
  }
}
</script>

