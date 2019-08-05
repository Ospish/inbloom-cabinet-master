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
          <span>Списать:</span>
          <span></span>
        </div>
        <ItemInStock v-for="item in itemsInStock" :key="item.id" :itemData="item" @removeRow="removeRow"/>
      </div>  
    </div>
    <div class="stock-box in-transit" v-if="requestItems.length != 0">
      <h3 class="stock__title">
        Товар в пути:
      </h3>
      <RequestItem v-for="item in requestItems" :key="item.id" :itemData="item" @removeRequest="removeRequest"/>
    </div>
  </div>
</template>

<script>

import ItemInStock from '@/components/stock/ItemInStock.vue'
import RequestItem from '@/components/stock/RequestItem.vue'

export default {
  name: 'Stock',
  data() {
    return {
      title: 'Склад',
      itemsRow: null,
      itemsInStock: [
        { id: 1,
          name: 'Позиция 1',
          count: 7
        },
        { id: 2,
          name: 'Позиция 2',
          count: 3
        },
        { id: 3,
          name: 'Позиция 3',
          count: 7
        },
        { id: 4,
          name: 'Позиция 4',
          count: 8
        },
        { id: 5,
          name: 'Позиция 5',
          count: 2
        },
        { id: 6,
          name: 'Позиция 6',
          count: 3
        },
        { id: 7,
          name: 'Позиция 7',
          count: 1
        }
      ],
      requestItems: [
        {
          id: 1,
          date: '2019-03-01 11:28:17'
        },
        {
          id: 2,
          date: '2019-01-01 11:28:17'
        }
      ]
    }
  },
  components: {
    ItemInStock,
    RequestItem
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', this.title)
    },
    removeRow(params) {
      this.itemsRow = this.itemsInStock.find(item => item.id == params[0])
      if (params[1] == this.itemsRow.count) {
        this.itemsInStock = this.itemsInStock.filter(item => item.id != params[0])
      }
      else {
        this.itemsRow.count = this.itemsRow.count - params[1]
      }
    },
    removeRequest(id) {
      this.requestItems = this.requestItems.filter(item => item.id != id)
      console.log(this.requestItems.length)
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
    width: calc(97% - 39em)
  .in-transit
    width: 39em
  @media (max-width: 768px)
    .stock-container
      flex-direction: column
    .stock_in
      width: 100%
      margin-bottom: 2em
    .in-transit
      width: 100%
</style>
