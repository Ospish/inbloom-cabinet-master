<template>
  <div>
    <div class="shop-container">
      <div class="catalog-header flex">
        <p>Товар в наличии: </p>
        <!-- The buttons on top controlling shop type. Add item button is invisible for non admins when shop type = 0 -->
        <div class="catalog-header__buttons">
          <button @click="setShopType(0); showPopup = false" v-bind:class="{ active: shopType == 0 }" class="catalog-btn">Опт</button>
          <button @click="setShopType(1); showPopup = false" v-bind:class="{ active: shopType == 1 }" class="catalog-btn">Сайт</button>
        </div>
        <div class="catalog-header__buttons add-button">
          <button v-if="shopType == 1 || isAdmin" class="edit-item-btn add" @click="plusButton">
            +
          </button>
          <span class="add-shop-popup" v-if="showPopup">
            <button @click="openEditor(-1)">Товар</button>
            <button @click="showPopup = false; showInput0 = true;">Категория</button>
            <button @click="showPopup = false; showInput1 = true;">Подкатегория</button>
          </span>
          <span class="add-category__input" v-if="showInput0">
            <input v-model="input0" type="text"><button @click="add">Добавить</button>
          </span>
          <span class="add-category__input" v-if="showInput1">
            <input v-model="input1" type="text"><button @click="addSubCategory({name: input1, id: currentTab.id}); showInput1 = false">Добавить</button>
          </span>
        </div>
      </div>
      <div v-if="shopType == 0" class="catalog-header">
        <!-- The second row buttons controlling product type -->
        <h2 class="catalog-header__title" :class="{active: accordeonHeight.categories != '0px'}" @click="changeAccordion('categories')">Категории</h2>
        <div class="report-buttons" :style="{height: accordeonHeight.categories}">
            <ShopCategorie v-for="tab in categoriesInfo" :key="tab.id" :tab="tab" :currentTab="currentTab" :type="0" @selectSubcategory="selectCategory" @changeSubcategory="changeCategory" @deleteSubcategory="deleteCategory"></ShopCategorie>
        </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <!-- The third row buttons controlling product subtype -->
        <h2 class="catalog-header__title" :class="{active: accordeonHeight.subcategories != '0px'}" v-if="currentTab.subs.length > 0" @click="changeAccordion('subcategories')">Подкатегории</h2>
        <div class="report-buttons subcategories" :style="{height: this.accordeonHeight.subcategories}">
          <ShopCategorie v-for="tab in currentTab.subs" :key="tab.id" :tab="tab" :type="1" :currentTab="currentTab2" @selectSubcategory="selectSubcategory" @changeSubcategory="changeSubcategory" @deleteSubcategory="deleteSubcategory"></ShopCategorie>
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
import ShopCategorie from '@/components/shop/ShopCategorie.vue'
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
      if (item == undefined) return { name: '', description: '', price: 0, available: true }
      else return item
    },
  },
  data () {
    return {
      title: 'Магазин',
      currentTab: '',
      currentTab2: '',
      showPopup: false,
      showInput0: false,
      showInput1: false,
      input0: '',
      input1: '',
      accordeonHeight: {
        categories: '0px',
        subcategories: '0px'
      }
    }
  },
  components: {
    CatalogItem,
    AddItemToShop,
    AddItemToFranch,
    ShopCategorie
  },
  methods: {
    ...mapActions([ 'openEditor', 'changeStore', 'addCategory', 'addSubCategory' ]),
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
      if (this.isEdited != -1) {
        this.$store.commit('openEditor', id)
        setTimeout(function () {
          window.scrollTo(0,document.body.scrollHeight);
        }, 100)
      }
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
      if (this.shopType == 0 && item.type == this.currentTab.id) {
        let index = this.categoriesInfo.findIndex(cat => cat.id === this.currentTab.id)
        if (this.categoriesInfo[index].subs.length == 0) {
          return true
        }
        if (item.sub == this.currentTab2.id) return true
      }
      else return false
    },
    plusButton(){
      if (this.shopType == 0) {
        this.showPopup = !this.showPopup
        this.showInput0 = false
        this.showInput1 = false
      }
      else this.openEditor(-1)
    },
    selectCategory(tab){
      if (document.width < 600) this.accordeonHeight['categories'] = '0px'
      tab.index = this.categoriesInfo.findIndex(cat => cat.id === tab.id)
      this.currentTab = tab
      this.currentTab2 = this.currentTab.subs[0]
      this.$store.commit('openEditor', null)
      console.log(tab.index)
    },
    add(){
      let arr = this.categoriesInfo.map(function(o){ return o.id })
      this.addCategory({name: this.input0, id: Math.max.apply(Math, arr)+1, subs: []})
      this.showInput0 = false
    },
    deleteCategory(tab){
      if (this.currentTab == tab) this.currentTab = this.categoriesInfo[0]
      this.$store.dispatch('deleteCategory', tab)
      this.$forceUpdate();
      console.log(tab)
    },
    changeCategory(tab){
      this.currentTab = tab
    },
    saveCategory($event, tab){
      $event.path[2].firstChild.setAttribute('readonly', 'readonly')
    },
    selectSubcategory(tab){
      if (document.width < 600) this.accordeonHeight['subcategories'] = '0px'
      this.currentTab2 = tab
      console.log(this.currentTab2.id)
    },
    deleteSubcategory(tab){
      if (this.currentTab == tab) this.currentTab = this.categoriesInfo[0]
      tab.parent = this.currentTab.id
      this.$store.dispatch('deleteSubCategory', tab)
      this.$forceUpdate();
      console.log(tab)
    },
    changeSubcategory(tab){
      this.currentTab2 = tab
    },
    saveSubcategory($event, tab){
      $event.path[2].firstChild.setAttribute('readonly', 'readonly')

    }
  },
  mounted () {
    this.addTitle(this.title)
    this.currentTab = this.categoriesInfo[0]
    this.currentTab2 = this.categoriesInfo[0].subs[0]
    this.accordeonHeight['categories'] = 'auto'
    this.accordeonHeight['subcategories'] = 'auto'
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
  &.flex
    display: flex
    align-items: center
  &__buttons
    position: relative
.catalog-item
  margin: 2em
  margin-left: 0
.add-category__input
  margin-left: .5em
  height: 100%
  input
    border-radius: 3px 0 0 3px
    border: 1px solid #555555
    padding: 0 .5em
    height: 1.7em
  button
    height: 1.7em
    border: 1px solid #555555
    border-left: none
    border-radius: 0 3px 3px 0
    font-size: 1em
    &:hover
      background-color: #d43eff
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

@media (max-width: 767px)
  .shop-container
    padding: 2em 2em
  .catalog-header__buttons.add-button
    margin-top: 1em
  .catalog-header.flex
    flex-wrap: wrap
  .catalog-item
    width: 30%
    margin: 1.5em 1.5%
    margin-left: 1.5%
  .edit-item-btn
    padding: 0
    line-height: 1.5em
  .report-btn
    width: calc(50% - .5em)!important
    &__inner
      padding: 0 .8em
  .add-shop-popup
    right: 1.7em
    bottom: 50%
    z-index: 2
    transform: translateX(0)
@media (max-width: 500px)
  .catalog-item
    width: 45%
    margin-right: 2.5%
    margin-left: 2.5%
</style>
