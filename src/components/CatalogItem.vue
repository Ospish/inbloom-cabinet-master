<template>
  <div class="catalog-item">
    <div class="catalog-item__image-box">
      <span v-if="shopType == 0 || !isAdmin" class="catalog-item__count">{{ itemData.quantity || 0 }}</span>
      <button v-if="shopType == 1 || isAdmin" @click="openEditor" class="catalog-item__edit-item">
        <img src="./../assets/img/icons/edit.svg" alt="">
      </button>
      <div v-if="shopType == 0" class="catalog-item__add">
        <span v-if="userRole == 4 " class="catalog-item__full-price">{{ itemData.price * itemData.quantity || 0 }} р.</span>
        <span v-if="userRole == 3" class="catalog-item__full-price">{{ itemData.price_premium * itemData.quantity || 0 }} р.</span>
        <span v-if="userRole < 3" class="catalog-item__full-price">{{ itemData.price_vip * itemData.quantity || 0 }} р.</span>
        <div>
          <button class="edit-item-btn off" @click="removeItem">-</button>
          <button class="edit-item-btn add" @click="addItem">+</button>
        </div>
      </div>
      <img :src="itemData.photo || noPhoto" alt="">
    </div>
    <p class="catalog-item__description">{{ itemData.name }}</p>
    <p v-if="userRole == 4 || isAdmin || itemData.id < 500" class="catalog-item__price">Цена: {{ itemData.price }} р.</p>
    <p v-if="userRole == 3 && itemData.id > 499" class="catalog-item__price">Цена: {{ itemData.price_premium }} р.</p>
    <p v-if="userRole == 2 && itemData.id > 499" class="catalog-item__price">Цена: {{ itemData.price_vip }} р.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'CatalogItem',
  props: ['itemData', 'itemIndex', 'basketItem'],
  computed: {
    ...mapGetters(['isAdmin', 'shopType', 'productsInfo', 'stockInfo', 'basketInfo', 'userRole', 'noPhoto', 'isEdited', 'isLoaded']),
    basketItemQuantity: function() {
        //let index = this.basketInfo.findIndex(product => product.id === this.itemIndex)
        if (this.itemData.quantity == undefined) {return 1}
        else {
          console.log(this.itemData.quantity)
          return this.itemData.quantity
        }
    },
  },
  watch: {
    isEdited(){
      this.$forceUpdate();
    },
    isLoaded(){
      this.$forceUpdate();
    }
  },
  methods: {
    ...mapActions(['basketPush', 'basketPull']),
    addItem () {
      this.$store.commit('basketPush', this.itemData)
      this.$forceUpdate();
    },
    removeItem () {
      this.$store.commit('basketPull', this.itemData)
      this.$forceUpdate();
    },
    openEditor () {
      console.log('this.itemData.id: ' + this.itemIndex)
      this.$store.commit('openEditor', this.itemIndex)
    },
  }
}
</script>
