<template>
  <div class="stock-table__row">
    <div class="span">{{ itemData.name }}</div>
    <div class="stock-table__counter">
      <button class="stock-counter__btn" @click="offItem">-</button>
      <span class="stock-counter__value">{{ itemData.count }}</span>
      <button class="stock-counter__btn" @click="addItem">+</button>
      <span> шт.</span>
    </div>
    <div class="span last">{{itemData.price * itemData.count }} руб.</div>
  </div>
</template>

<script>
export default {
  name: 'ItemInBasket',
  props: ['itemData'],
  data() {
    return {
    }
  },
  methods: {
    offItem() {
      if (this.itemData.count > 1) this.itemData.count--;
      else this.removeItems() 
    },
    addItem() {
      this.itemData.count++;
    },
    removeItems() {
      this.$emit('removeRow', this.itemData.id)
    }
  }
}
</script>

<style lang="sass">
  .span.last
    text-align: right
</style>