<template>
  <div>
    <div class="shop-container">
      <div class="catalog-header">
        <span>Товар в наличии: </span>
        <!-- The buttons on top controlling shop type. Add item button is invisible for non admins when shop type = 0 -->
        <span class="catalog-header__buttons">
          <button @click="setShopType(0)" v-bind:class="{ active: shopType == 0 }" class="catalog-btn">Опт</button>
          <button @click="setShopType(1)" v-bind:class="{ active: shopType == 1 }" class="catalog-btn">Сайт</button>
          <button v-if="shopType == 1 || isAdmin" class="edit-item-btn add" @click="showPopup = !showPopup">
            +
          </button>
          <span class="add-shop-popup" v-if="showPopup">
            <button @click="openEditor(-1)">Товар</button>
            <button @click="showPopup = false">Категория</button>
            <button @click="showPopup = false">Подкатегория</button>
          </span>
        </span>
      </div>
      <div v-if="shopType == 0" class="catalog-header">
        <!-- The second row buttons controlling product type -->
        <h2 class="catalog-header__title" :class="{active: accordeonHeight.categories != '0px'}" @click="changeAccordion('categories')">Категории</h2>
        <div class="report-buttons" :style="{height: accordeonHeight.categories}">
          <button class="report-btn" v-for="tab in categoriesInfo" :key="tab.name" :class="[currentTab.name, { active: currentTab.name === tab.name}]" @click="selectCategory(tab, 'categories')">{{ tab.name }}</button>
        </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <!-- The third row buttons controlling product subtype -->
        <h2 class="catalog-header__title" :class="{active: accordeonHeight.subcategories != '0px'}" v-if="categoriesInfo[currentTab.id].subs.length != 0" @click="changeAccordion('subcategories')">Подкатегории</h2>
        <div class="report-buttons" :style="{height: this.accordeonHeight.subcategories}">
          <button class="report-btn" v-for="tab in categoriesInfo[currentTab.id].subs" :key="tab.name" :class="[currentTab2.name, { active: currentTab2.name === tab.name}]" @click="selectSubcategory(tab, 'subcategories')">{{ tab.name }}</button>
        </div>
      </div>
      <CatalogItem v-if="shopType == 1 && item.userid == userId" v-for="(item, index) in shopInfo" :key="item.id" :itemIndex="index" :itemData="item"/>
      <CatalogItem v-if="showStock(item)" v-for="(item, index) in stockInfo" :key="item.id" :itemIndex="index" :itemData="item"/>
    </div>
    <AddItemToShop :itemData="shopItemInfo" v-if="shopType == 1 && isEdited != null"/>
    <AddItemToFranch :itemData="stockItemInfo" :selectedType="currentTab.id" :selectedSub="currentTab2.id" v-if="shopType == 0 && isEdited != null"/>
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
    ...mapGetters(['isAdmin', 'shopInfo', 'isEdited', 'shopType', 'userId', 'basketInfo', 'stockInfo', 'categoriesInfo']),
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
      currentTab: '',
      currentTab2: '',
      showPopup: false,
      accordeonHeight: {
        categories: '0px',
        subcategories: '0px'
      }
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
    changeAccordion(id) {
      if (this.accordeonHeight[id] == '0px'){
        console.log('Show')
        this.accordeonHeight[id] = 'auto'
      } else {
        this.accordeonHeight[id] = '0px'
        console.log('Hide')
        console.log(this.accordeonHeight)
      } 
    },
    setShopType (store) {
      this.$store.commit('changeStore', store)
      this.$store.commit('openEditor', null)
    },
    openEditor (id) {
      this.showPopup = false
      if (this.isEdited != -1) this.$store.commit('openEditor', id)
        else {
          this.$store.commit('openEditor', null)
      }
    },
    basketItemQuantity (item) {
      let index = this.basketInfo.findIndex(product => product.id === item.id)
      if (this.basketInfo.index == undefined) {return 0}
      else {
        return this.basketInfo.index.quantity
      }
    },
    showStock(item){
      return (this.shopType == 0 && item.type == this.currentTab.id && item.sub == this.currentTab2.id)
    },
    selectCategory(tab, accId){
      this.accordeonHeight[accId] = '0px'
      this.currentTab = tab
      console.log(this.currentTab.subs[0])
      if (this.currentTab.subs[0] != undefined) this.currentTab2 = this.currentTab.subs[0]

    },
    selectSubcategory(tab, accId){
      this.accordeonHeight[accId] = '0px'
      this.currentTab2 = tab
      console.log(this.currentTab2.id)
    }
  },
  mounted () {
    this.addTitle(this.title)
    this.currentTab = this.categoriesInfo[0]
    this.currentTab2 = this.categoriesInfo[0].subs[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
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
  &__buttons
    position: relative
.catalog-item
  margin: 2em
  margin-left: 0
.add-shop-popup
  position: absolute
  right: -.5em
  bottom: 50%
  z-index: 2
  transform: translateX(100%)
  button
    padding: .3em 0
    display: block
    width: 8em
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)
    background-color: #ffffff
    &:hover 
      background-color: #d43eff
.catalog-header__title
  text-align: center
  margin-bottom: 1em
  font-size: 1.2em
  width: fit-content
  margin-left: auto
  margin-right: auto
  cursor: pointer
  padding-right: 1.5em
  background-position: right center
  background-size: .8em
  background-repeat: no-repeat
  background-image: url('../assets/img/icons/arrow-down.svg')
  &.active 
    background-image: url('../assets/img/icons/arrow-up.svg')
.report-buttons
  margin-bottom: 1em
  max-width: 100%
  width: 100%
  flex-wrap: wrap
  height: auto
  justify-content: space-between
  .report-btn
    margin-bottom: 1em
    padding: .5em 0
    margin: .25em
    width: calc(25% - .5em)
    border-radius: 1em;
    &:last-child
      margin-right: auto
@media (max-width: 767px)
  .shop-container
    padding: 2em 2em
  .catalog-item
    width: 30%
    margin: 1.5em 1.5%
    margin-left: 1.5%
  .edit-item-btn
    padding: 0
    line-height: 1.5em
  .report-btn
    width: calc(50% - .5em)!important
  .add-shop-popup
    right: 1.7em
    bottom: 50%
    z-index: 2
    transform: translateX(0)
@media (max-width: 350px)
  .catalog-item
    width: 36%
    margin-right: 7%
    margin-left: 7%
</style>
