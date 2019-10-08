<template>
  <div class="stock-container">
    <div v-if="basketInfo.length > 0" class="stock-box stock_in" >
      <h3 class="stock__title">
        Корзина:
      </h3>
      <div class="stock-table">
        <div class="stock-table__row stock-table__head">
          <span>Наименование:</span>
          <span>Количество:</span>
          <span>Цена:</span>
        </div>
        <ItemInBasket v-for="item in basketInfo" :key="item.id" :itemData="item" :sum="sum" @removeRow="removeRow"/>

      </div>
      <p class="table-sum">Итого: {{ basketSum }} руб.</p>
      <button @click="makeOrder(request)" class="btn-default purple">Заказать</button>
      <button @click="$store.commit('basketFlush')" class="btn-default">Очистить</button>
    </div>
    <div v-if="basketInfo.length == 0">Корзина пуста. Пожалуйста, перейдите в <router-link to="/home/shop">магазин</router-link> для покупки.</div>
    <div v-if="modal" @click="modal = !modal"  class="auth">
      <div class="auth-modal">
        <span class="close-modal" @click="closeModal"></span>
        <div class="auth-modal__title">
          Заявка отправлена
        </div>
        <form action="" class="auth-modal__form">
            <p>
              В ближайшее время с Вами свяжется менеджер.
            </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemInBasket from '@/components/ItemInBasket.vue'
export default {
  name: 'Basket',
  data() {
    return {
      title: 'Корзина',
      itemsRow: null,
      card: null,
      modal: false,
    }
  },
  watch: {
    sum: function(){
      return this.basketInfo.reduce(function(sum, current){
        return sum + (current.quantity * current.price)
      }, 0)
    }
  },
  computed: {
    ...mapGetters(['basketInfo', 'userInfo', 'basketSum', 'shopInfo']),
    request(){
      let item = {}
      item.posInfo_products = []
      item.posInfo_quantity = []
      for (let x = 0; x < this.basketInfo.length; x++) {
        item.posInfo_quantity.push(this.basketInfo[x].quantity)
        item.posInfo_products.push(this.basketInfo[x].id)
      }
      item.posInfo_quantity = JSON.stringify(item.posInfo_quantity)
      item.posInfo_products = JSON.stringify(item.posInfo_products)
      console.log(item.posInfo_products)
      item.value = this.sum
      item.type = 2
      return item
    },
    sum() {
      return this.basketInfo.reduce(function (sum, current) {
        return sum + (current.quantity * current.price)
      }, 0)
    }
  },
  components: {
    ItemInBasket
  },
  methods: {
    ...mapActions(['addRequest', 'addStatsRecord']),
    addTitle(title) {
      this.$emit('showTitle', this.title)
    },
    removeRow(id) {
      this.itemsRow = this.basket.find(item => item.id == id)
      this.basket = this.basket.filter(item => item.id != id)
    },
    makeOrder(request) {
      this.modal = true
      this.$store.commit('basketFlush')
      this.$store.commit('addStatsRecord', {value: request.value})
      this.addRequest(request)
    }
  },
  mounted() {
    this.addTitle(this.title)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .btn-default
    margin-right: 1em
  .stock-container
    display: flex
    justify-content: space-between
  .stock_in
    width: 80%
  .table-sum
    font-weight: 700
    margin-bottom: 1em
  @media (max-width: 768px)
    .stock-container
      flex-direction: column
    .stock_in
      width: 100%
      margin-bottom: 2em
    .in-transit
      width: 100%
    .btn-default
      width: auto
</style>
