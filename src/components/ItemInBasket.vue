<template>
  <div class="stock-table__row">
    <div class="span">{{ itemData.name }}</div>
    <div class="stock-table__counter">
      <button class="stock-counter__btn" @click="offItem">-</button>
      <span class="stock-counter__value">{{ itemData.quantity }}</span>
      <button class="stock-counter__btn" @click="addItem">+</button>
      <span> шт.</span>
    </div>
    <div class="span last">{{itemData.price * itemData.quantity }} руб.</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ItemInBasket',
  props: ['itemData'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['isAdmin']),
    isDisplayed () {
      let result = ((((parseInt(this.itemData.type) === 0) && (this.isAdmin))) || (parseInt(this.itemData.type) === 1))
      console.log(result)
      return result
    }
  },
  methods: {
    ...mapActions(['basketPush', 'basketPull']),
    offItem() {
      this.$store.commit('basketPull', this.itemData)
      this.$forceUpdate();
    },
    addItem() {
      this.$store.commit('basketPush', this.itemData)
      this.$forceUpdate();
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
