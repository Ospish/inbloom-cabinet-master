<template>
  <div class="partner-item">
    <div class="partner-item__image-box">
      <div class="partner-item__buttons">
        <template v-if="isRemove">
          <button class="btn-no" @click="isRemove = false">Нет</button> 
          <button class="btn-yes" @click="remove">Да</button>
        </template>
        <button class="btn-remove" @click="isRemove = true">
          <img src="./../assets/img/icons/trash_white.svg" alt="">
        </button>  
      </div>
      <img src="" alt="">
    </div>
    <p class="partner-item__name">{{ itemData.name }}</p>
    <p class="partner-item__city">Г. {{ itemData.city }}</p>
    <div class="partner-item__socials">
      <a :href="itemData.socials.vk" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'vk']"></font-awesome-icon></a>
      <a :href="itemData.socials.instagram" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon></a>
      <a :href="itemData.socials.telegram" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'telegram']"></font-awesome-icon></a>
      <a :href="itemData.socials.whatsapp" class="partner-item__social-icon" target="_blank"><font-awesome-icon :icon="['fab', 'whatsapp']"></font-awesome-icon></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerItem',
  props: ['itemData'],
  data() {
    return {
      isRemove: false
    }
  },
  methods: {
    remove() {
      this.$emit('removeItem', this.itemData.id)
    }
  }
}
</script>
