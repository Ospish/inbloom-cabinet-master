<template>
  <div class="content-item">
    <div class="content-item__image-box">
      <div class="content-item__edit-tem">
        <div class="content-item__buttons">
            <template v-if="isRemove">
              <button class="btn-no" @click="isRemove = false">Нет</button>
              <button class="btn-yes" @click="remove">Да</button>
            </template>
            <button v-if="isAdmin " class="btn-remove" @click="isRemove = true">
              <img src="./../assets/img/icons/trash_white.svg" alt="">
            </button>
        </div>
      </div>
      <label class="add-item__image">
        <img class="avatar" id="img" :src="this.itemData.photo || noPhoto" alt="">
        <input :disabled="!isAdmin" @change="edit" type="file" accept="image/jpeg,image/png,image/gif" class="add-item__photo-input" >
      </label>

    </div>
    <p class="content-item__title">Описание:</p>
    <textarea :disabled="!isAdmin" @input="isEdit = true" v-model="itemData.description" class="content-item__description"></textarea>
    <button v-if="isAdmin && isEdit" @click="edit" class="btn-default">Сохранить</button>
  </div>
</template>

<script>
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ContentItem',
  computed: {
    ...mapGetters(['isAdmin', 'contentInfo', 'noPhoto', 'isLoaded'])
  },
  props: ['itemData', 'isAdding'],
  data () {
    return {
      isRemove: false,
      isEdit: false,
    }
  },
  watch: {
    isLoaded(){
      this.$forceUpdate();
    }
  },
  methods: {
    ...mapActions(['editContent', 'deleteContent']),
    remove () {
      this.deleteContent(this.itemData)
    },
    async edit (e) {
      if (e.target.files != undefined) {
        this.image = e.target.files[0]
        //img.src = await toBase64(this.image)
        this.$store.commit('updateContentPhoto', [ this.itemData.id, await toBase64(this.image)])
        this.$store.dispatch('uploadImage', { file: this.image, type: 'content', id: this.itemData.id })
        this.$forceUpdate();
      }
      this.editContent(this.itemData)
      this.isEdit = false
    }
  }
}
</script>
