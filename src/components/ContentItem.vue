<template>
  <div class="content-item">
    <div class="content-item__image-box">
      <div class="content-item__edit-tem">
      <div class="content-item__buttons">
          <template v-if="isRemove">
            <button class="btn-no" @click="isRemove = false">Нет</button> 
            <button class="btn-yes" @click="remove">Да</button>
          </template>
          <button class="btn-remove" @click="isRemove = true">
            <img :src="itemData.photo" alt="">
          </button>  
        </div>
      </div>
      <img src="" alt="">
    </div>
    <p class="content-item__title">Описание:</p>
    <p class="content-item__description">{{ itemData.descript }}</p>
    <button class="btn-default">Сохранить</button>
  </div>
</template>

<script>
export default {
  name: 'ContentItem',
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
