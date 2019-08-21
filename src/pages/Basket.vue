<template>
  <div class="stock-container">
    <div class="stock-box stock_in" >
      <h3 class="stock__title">
        Товар в наличии:
      </h3>
      <div class="stock-table">
        <div class="stock-table__row stock-table__head">
          <span>Наименование:</span>
          <span>Количество:</span>
          <span>Цена:</span>
        </div>
        <ItemInBasket v-for="item in itemsInStock" :key="item.id" :itemData="item" @removeRow="removeRow"/>
      </div>
      <p class="table-sum">Итого: {{ sum }} руб.</p> 
      <button @click="changeModal" class="btn-default purple">Заказать</button> 
    </div>
    <div v-if="modal" @click="changeModal" class="overlay"></div>
    <div v-if="modal" class="basket-window">
      <h3 class="basket-window__title uppercase">
        Оплатите онлайн переводом, <br>укажите номер заказа: <span>IB-09-09-1</span>
      </h3>
      <div class="basket-window__buttons">
        <button class="btn-default medium green">Sberbank</button>
        <button class="btn-default medium yellow">Tinkoff</button>
      </div>
      <div class="basket-window__card">
        <p class="basket-card__bank-name">Сбербанк</p>
        <input class="basket-card__number" placeholder="5555 5555 5555 5555">
        <input class="basket-card__name" placeholder="Иванович Иван Иванов">
      </div>
    </div>
  </div>
</template>

<script>

import ItemInBasket from '@/components/ItemInBasket.vue'

export default {
  name: 'Basket',
  data() {
    return {
      title: 'Корзина',
      itemsRow: null,
      card: null,
      itemsInStock: [
        { id: 1,
          name: 'Позиция 1',
          count: 7,
          price: 200
        },
        { id: 2,
          name: 'Позиция 2',
          count: 3,
          price: 400
        },
        { id: 3,
          name: 'Позиция 3',
          count: 7,
          price: 200
        },
        { id: 4,
          name: 'Позиция 4',
          count: 8,
          price: 150
        },
        { id: 5,
          name: 'Позиция 5',
          count: 2,
          price: 300
        },
        { id: 6,
          name: 'Позиция 6',
          count: 3,
          price: 250
        },
        { id: 7,
          name: 'Позиция 7',
          count: 1,
          price: 100
        }
      ],
      modal: false
    }
  },
  components: {
    ItemInBasket
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', this.title)
    },
    removeRow(id) {
      this.itemsRow = this.itemsInStock.find(item => item.id == id)
      this.itemsInStock = this.itemsInStock.filter(item => item.id != id)
    },
    changeModal() {
      this.modal = !this.modal
    }
  },
  computed: {
    sum(){
      return this.itemsInStock.reduce(function(sum, current){
        return sum = sum + (current.count * current.price)
      }, 0)
    }
  },
  mounted() {
    this.addTitle(this.title)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
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
</style>
