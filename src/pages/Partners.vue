<template>
  <div class="partners-wrap">
    <button v-if="isAdmin" @click="sendInvite = true"  class="btn-plus">+</button>
    <PartnerItem  v-for="item in partnersInfo" :key="item.id" :itemData="item" @removeItem="deletePartner"/>
    <Invitation v-if="sendInvite" @closeModal="sendInvite = false" />
  </div>
</template>

<script>

import PartnerItem from '@/components/PartnerItem.vue'
import Invitation from '@/components/SendInvitation.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Partners',
  computed: mapGetters(['isAdmin', 'partnersInfo']),
  data () {
    return {
      title: 'Партнеры',
      sendInvite: false
    }
  },
  components: {
    PartnerItem,
    Invitation
  },
  methods: {
    ...mapActions(['loadPartners', 'deletePartner']),
    addTitle(title) {
      this.$emit('showTitle', this.title)
    }
  },
  mounted() {
    this.addTitle(this.title)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.partners-wrap
  display: flex
  flex-wrap: wrap
.partner-item
  margin: 2em
  margin-left: 0
@media (max-width: 767px)
  .partner-item
    width: 30%
    margin: 1.5em 1.5%
    margin-left: 1.5%
@media (max-width: 350px)
  .partner-item
    width: 40%
    margin-right: 5%
    margin-left: 5%
</style>
