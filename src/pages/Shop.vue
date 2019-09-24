<template>
  <div>
    <div class="shop-container">
      <div class="catalog-header">
        <span>Товар в наличии: </span>
        <span>
          <button @click="setShopType(0)" v-bind:class="{ active: shopType == 0 }" class="catalog-btn">Опт</button>
          <button @click="setShopType(1)" v-bind:class="{ active: shopType == 1 }" class="catalog-btn">Сайт</button>
          <button v-if="shopType == 1 || isAdmin" class="edit-item-btn add" @click="openEditor(-1)">+</button>
        </span>
      </div>
      <div class="catalog-header">
        <div class="report-buttons">
          <button class="report-btn" v-for="tab in tabs" :key="tab.name" :class="[currentTab.name, { active: currentTab.name === tab.name}]" @click="currentTab = tab">{{ tab.name }}</button>
        </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div class="report-buttons">
            <button class="report-btn" v-if="isAdmin" v-for="tab in tabs[currentTab.index].subs" :key="tab.name" :class="[currentTab2.name, { active: currentTab2.name === tab.name}]" @click="currentTab2 = tab">{{ tab.name }}</button>
        </div>
      </div>
      <CatalogItem v-if="shopType == 1 && item.userid == userId" v-for="(item, index) in shopInfo" :key="item.id" :itemIndex="index" :itemData="item"/>
      <CatalogItem v-if="shopType == 0" v-for="(item, index) in stockInfo" :key="item.id" :itemIndex="index" :itemData="item"/>
    </div>
    <AddItemToShop :itemData="shopItemInfo" v-if="shopType == 1 && isEdited != null"/>
    <AddItemToFranch :itemData="stockItemInfo" v-if="shopType == 0 && isEdited != null"/>
  </div>
</template>

<script>

import CatalogItem from '@/components/CatalogItem.vue'
import AddItemToShop from '@/components/AddItemToShop.vue'
import AddItemToFranch from '@/components/AddItemToFranch.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Shop',
  computed: {
    ...mapGetters(['isAdmin', 'shopInfo', 'isEdited', 'shopType', 'userId', 'basketInfo', 'stockInfo']),
    shopItemInfo () {
      let item = this.shopInfo[this.isEdited]
      if (item == undefined) return { name: '', description: '', price: 0 }
      else return item
    },
    stockItemInfo () {
      let item = this.stockInfo[this.isEdited]
      if (item == undefined) return { name: '', description: '', price: 0 }
      else return item
    },
  },
  data () {
    return {
      title: 'Магазин',
      tabs: [
        {
          index: 0,
          name: 'Розы',
          dataName: 'request_closed',
          data: null,
          subs: [
            { name: 'Стадартные', },
            { name: 'Большие', },
            { name: 'Плоские' },
            { name: 'Вывернутые' },
            { name: 'С напылением' },
            { name: 'Корейская' },
            { name: 'Кучерявая' },
            { name: 'Мелкая' },
            { name: 'Пионовидная' },
            { name: 'Радужная' },
          ]
        },
        {
          index: 1,
          name: 'Пионы',
          dataName: 'request_deleted',
          data: null,
          subs: [
          ]
        },
        {
          index: 2,
          name: 'Коробки',
          dataName: 'request_deleted',
          data: null,
          subs: [
            { name: 'Коробки 1', },
            { name: 'Коробки 2', },
            { name: 'Коробки 3' },
          ]
        },
        {
          index: 3,
          name: 'Доп. материалы',
          dataName: 'request_deleted',
          data: null,
          subs: [
            { name: 'Доп. материалы 1', },
            { name: 'Доп. материалы 2', },
            { name: 'Доп. материалы 3' },
          ]
        },
      ],

    currentTab: '',
      currentTab2: ''
    }
  },
  components: {
    CatalogItem,
    AddItemToShop,
    AddItemToFranch
  },
  methods: {
    ...mapActions([ 'openEditor', 'changeStore' ]),
    addTitle (title) {
      this.$emit('showTitle', this.title)
    },
    setShopType (store) {
      this.$store.commit('changeStore', store)
      this.$store.commit('openEditor', null)
    },
    openEditor (id) {
      if (this.isEdited != -1) this.$store.commit('openEditor', id)
        else {
          this.$store.commit('openEditor', null)
      }
    },
    basketItemQuantity (item) {
      let index = this.basketInfo.findIndex(product => product.id === item.id)
      if (this.basketInfo.index == undefined) {return 0}
      else {
        console.log(this.basketInfo.index.quantity)
        console.log('AAAAAAAAAAAAA')
        return this.basketInfo.index.quantity
      }

    }
  },
  mounted () {
    this.addTitle(this.title)
    this.currentTab = this.tabs[0]
    this.currentTab2 = this.tabs[0].subs[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.shop-container
  display: flex
  flex-wrap: wrap
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)
  background-color: #fff
  padding: 2em 5em
  margin-bottom: 2em
.catalog-header
  width: 100%
  padding-bottom: .7em;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 1em;
.catalog-item
  margin: 2em
  margin-left: 0
@media (max-width: 767px)
  .shop-container
    padding: 2em 3em
  .catalog-item
    width: 30%
    margin: 1.5em 1.5%
    margin-left: 1.5%
  .edit-item-btn
    padding: 0
    line-height: 1.5em
@media (max-width: 350px)
  .catalog-item
    width: 36%
    margin-right: 7%
    margin-left: 7%
</style>
