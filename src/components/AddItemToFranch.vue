<template>
  <div class="add-item-panel">
    <h3 class="add-item__title">Добавить товар для франчайзи: <span>+</span></h3>
    <form action="">
      <label class="add-item__image">
        <img id="avatar" :src="itemData.photo || noPhoto" alt="">
        <input id="upload" @change="sync" type="file"  accept="image/jpeg,image/png,image/gif" class="add-item__photo-input" >
      </label>
      <div class="add-item__description width-20">
        <h4>Наименование:</h4>
        <input type="text" v-model="itemData.name" class="add-item__input">
          <h4>Товар в наличии
          <input checked type="checkbox" v-model="itemData.available" class="add-item__input">
          </h4>
      </div>
      <div class="add-item__description width-20">
        <h4>Описание:</h4>
        <textarea style='width: 230px' rows="6" v-model="itemData.description" class="add-item__input"></textarea>
        <!-- TODO: move inline to styles -->
      </div>
      <div class="add-item__description width-20">
        <h4>Цена:</h4>
        <label class="add-item__prices-label">Эконом: <input type="text" v-model="itemData.price" class="add-item__input"></label>
        <label class="add-item__prices-label">Премиум: <input type="text" v-model="itemData.price_premium" class="add-item__input"></label>
        <label class="add-item__prices-label">VIP: <input type="text" v-model="itemData.price_vip" class="add-item__input"></label>
      </div>
      <div class="flex-col">
        <input type="hidden" class="add-item__input">
        <div class="add-item__buttons">
          <button type="button" v-if="isEdited >= 0" @click="save" class="btn-default big purple-orange">Сохранить</button>
          <button type="button" v-if="isEdited < 0" @click="create" class="btn-default big purple-orange">Создать</button>
          <a class="add-item_remove-btn" @click="deleteProduct(itemData)">Удалить</a>
        </div>
      </div>
    </form>
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
  props: ['itemData', 'selectedType', 'selectedSub'],
  data() {
    return {
      item: {}
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'isEdited', 'noPhoto', 'shopType', 'stockInfo']),
  },

  methods: {
    ...mapActions(['addProduct', 'editProduct', 'deleteProduct', 'uploadImage']),
    async save() {
      if (this.editProduct(this.itemData) && upload.files[0]) {
        this.$store.commit('updateShopPhoto', [this.itemData.id, await toBase64(upload.files[0])])
        this.$store.dispatch('uploadImage', { file: upload.files[0], type: 'stock', id: this.itemData.id })
        this.$forceUpdate();
      }
    },
    async create() {
      let item = this.itemData
      item.type = this.selectedType
      if (typeof this.selectedSub != 'undefined') item.sub = this.selectedSub
      item.photo = upload.files[0]
      item.photosrc = await toBase64(upload.files[0])
      this.addProduct(item)
      this.$forceUpdate();
    },
    async sync (e) {
      this.image = e.target.files[0]
      avatar.src = await toBase64(this.image)
    }
  },
  mounted () {
  }
}
</script>
