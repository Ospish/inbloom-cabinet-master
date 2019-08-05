<template>
  <div class="stock-table__row">
    <div class="span">{{ itemData.name }}</div>
    <span>{{ itemData.count }} шт.</span>
    <div class="stock-table__counter">
      <button class="stock-counter__btn" @click="offItem">-</button>
      <span class="stock-counter__value">{{ removeCount }}</span>
      <button class="stock-counter__btn" @click="addItem">+</button>
      <span> шт.</span>
    </div>
    <button class="write-off_btn" @click="removeItems">Списать</button>
  </div>
</template>

<script>
export default {
  name: 'ItemInStock',
  props: ['itemData'],
  data() {
    return {
      removeCount: 1
    }
  },
  methods: {
    offItem() {
      if (this.removeCount > 1) this.removeCount--; 
    },
    addItem() {
      if (this.itemData.count > this.removeCount) this.removeCount = this.removeCount + 1;
    },
    removeItems() {
      this.$emit('removeRow', [this.itemData.id, this.removeCount])
      this.removeCount = 1
    }
  }
}
</script>