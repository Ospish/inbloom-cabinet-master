<template>
  <div class="partner-item">
    <div class="partner-item__image-box">
      <div class="partner-item__buttons">
        <template v-if="isRemove">
          <button class="btn-no" @click="isRemove = false">Нет</button>
          <button class="btn-yes" @click="remove">Да</button>
        </template>
        <button v-if="isAdmin" class="btn-remove" @click="isRemove = true">
          <img src="./../assets/img/icons/trash_white.svg" alt="">
        </button>
      </div>
      <img id="partnerimg" class="avatar" :src="itemData.photo || noPhoto" alt="">
    </div>
    <p class="partner-item__name">{{ itemData.name || "-ИМЯ НЕ УКАЗАНО-" }}</p>
    <p>
      <span class="partner-item__city">Г. {{ itemData.city }}</span>
      <span class="partner-role">
        <span v-if="itemData.role == 0"><img :src="star"><img :src="star"><img :src="star"><img :src="star"><img :src="star"></span>
        <span v-if="itemData.role == 1"><img :src="star"><img :src="star"><img :src="star"><img :src="star"></span>
        <span v-if="itemData.role == 2"><img :src="star"><img :src="star"><img :src="star"></span>
        <span v-if="itemData.role == 3"><img :src="star"><img :src="star"></span>
        <span v-if="itemData.role == 4"><img :src="star"></span>
      </span>
    </p>

    <div class="partner-item__socials">
      <a v-if="itemData.vk" :href="'https://vk.com/'+itemData.vk" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'vk']"></font-awesome-icon></a>
      <a v-if="itemData.instagram" :href="'https://instagram.com/'+itemData.instagram" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon></a>
      <a v-if="itemData.telegram" :href="'https://t.me/'+itemData.telegram" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'telegram']"></font-awesome-icon></a>
      <a v-if="itemData.whatsapp" :href="'https://wa.me/'+itemData.whatsapp" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'whatsapp']"></font-awesome-icon></a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PartnerItem',
  computed: {
    ...mapGetters(['isAdmin', 'noPhoto', 'isLoaded'])
  },
  props: ['itemData'],
  data() {
    return {
      isRemove: false,
      star: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgLjU4N2wzLjY2OCA3LjU2OCA4LjMzMiAxLjE1MS02LjA2NCA1LjgyOCAxLjQ4IDguMjc5LTcuNDE2LTMuOTY3LTcuNDE3IDMuOTY3IDEuNDgxLTguMjc5LTYuMDY0LTUuODI4IDguMzMyLTEuMTUxeiIvPjwvc3ZnPg=='
    }
  },
  watch: {
    isLoaded(){
      this.$forceUpdate();
    }
  },
  methods: {
    remove() {
      this.$emit('removeItem', this.itemData)
    }
  }
}
</script>
<style lang="sass">
  .partner-role
    text-align: right
    width: 38%
  .partner-item__city
    width: 62%
  .partner-role, .partner-item__city
    display: inline-block
    img
      width: 13px

</style>
