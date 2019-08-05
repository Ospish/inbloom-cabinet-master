<template>
  <div class="catalog-item">
    <div class="catalog-item__image-box">
      <span class="catalog-item__count">{{ itemData.count }}</span>
      <a class="catalog-item__edit-item"></a>
      <div class="catalog-item__add">
        <span class="catalog-item__full-price">{{ itemData.price * itemData.count }} р.</span>
        <div>
          <button class="edit-item-btn off" @click="offItem">-</button>
          <button class="edit-item-btn add" @click="addItem">+</button>
        </div>
      </div>
      <img :src="itemData.photo" alt="">
    </div>
    <p class="catalog-item__description">{{ itemData.descript }}</p>
    <p class="catalog-item__price">Цена: {{ itemData.price }} р.</p>
  </div>
</template>

<script>
export default {
  name: 'CatalogItem',
  props: ['itemData'],
  data() {
    return {

    }
  },
  methods: {
    offItem() {
      if (this.itemData.count > 1) this.itemData.count--; 
    },
    addItem() {
      this.itemData.count = this.itemData.count + 1
    }
  }
}
</script>
