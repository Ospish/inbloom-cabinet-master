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
        <ItemInStock v-if="item[userId] > 0" v-for="(item, index) in stockInfo" :key="item.id" :itemData="stockInfo[index]" @writeOff="writeOff"/>
      </div>
      <div v-if="stockInfo[0][userId] + stockInfo[1][userId] + stockInfo[2][userId] == 0">Склад пуст. Посетите <router-link to="/home/shop">магазин</router-link> для закупки товара.</div>
    </div>
    <div v-if="!isAdmin" class="stock-box in-transit">
      <h3 class="stock__title">
        Товар в пути:
      </h3>
      <RequestItem v-if="item.type == 2" v-for="item in stockRequests" :key="item.id" :itemData="item" @removeRequest="removeRequest"/>

    </div>
  </div>
</template>

<script>

import ItemInStock from '@/components/stock/ItemInStock.vue'
import RequestItem from '@/components/stock/RequestItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Stock',
  data() {
    return {
      title: 'Склад',
      itemsRow: null,
    }
  },
  components: {
    ItemInStock,
    RequestItem
  },
  computed: {
    ...mapGetters(['shopInfo', 'stockInfo', 'requestInfo', 'userId', 'isAdmin']),
    stockRequests(){
      if (this.requestInfo.length > 0) {
        return this.requestInfo.filter(item => item.status == 'request_sent' && item.userid == this.userId)
        }
    }
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', this.title)
    },
    writeOff(params) {

      /*
      this.itemsRow = this.stockInfo.find(item => item.id == params[0])
      if (params[1] === this.itemsRow.count) {
        this.stockInfo = this.stockInfo.filter(item => item.id != params[0])
      }
      else {
        this.itemsRow.count = this.itemsRow.count - params[1]
      }

       */
    },
    removeRequest(id) {
      this.stockInfo = this.requestInfo.filter(item => item.id != id)
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
