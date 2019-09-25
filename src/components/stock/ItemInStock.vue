<template >
  <div v-if="isDisplayed" class="stock-table__row">
    <div class="span">{{ itemData.name }}</div>
    <span>{{ itemData[userId] }} шт.</span>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ItemInStock',
  props: ['itemData'],
  data() {
    return {
      removeCount: 1
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'userId']),
    isDisplayed () {
      /*
      let result = ((((parseInt(this.itemData.type) === 0) && (this.isAdmin))) || (parseInt(this.itemData.type) === 1))
      return result
       */
      return true
    }
  },
  methods: {
    ...mapActions(['pullProductStock']),
    offItem() {
      if (this.removeCount > 1) this.removeCount--;

    },
    addItem() {
      if (this.itemData[this.userId] > this.removeCount) this.removeCount++;
    },
    removeItems() {
      if (this.itemData[this.userId] >= this.removeCount) {
        this.pullProductStock({ id: this.itemData.id, quantity: this.removeCount })
        this.removeCount = 1
      }
      else {alert('Склад пуст!')}
    }
  }
}
</script>
