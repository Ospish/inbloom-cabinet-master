<template>
  <div>
    <div class="shop-container">
      <div class="catalog-header">
        <span>Товар в наличии: </span>
        <button class="catalog-btn active">Сайт</button>
        <button class="catalog-btn">Опт</button>   
      </div>
      <CatalogItem  v-for="item in catalogItems" :key="item.id" :itemData="item" />
    </div>
    <AddItemToShop />
    <AddItemToFranch />
  </div>
</template>

<script>

import CatalogItem from '@/components/CatalogItem.vue'
import AddItemToShop from '@/components/AddItemToShop.vue'
import AddItemToFranch from '@/components/AddItemToFranch.vue'

export default {
  name: 'Shop',
  data() {
    return {
      title: 'Магазин',
      catalogItems: [
        { id: 1,
          count: 7,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 460
        },
        { id: 2,
          count: 3,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 560
        },
        { id: 3,
          count: 7,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 500
        },
        { id: 4,
          count: 8,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 560
        },
        { id: 5,
          count: 2,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 510
        },
        { id: 6,
          count: 3,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 560
        },
        { id: 7,
          count: 1,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 590
        },
        { id: 8,
          count: 1,
          descript: 'Маленькое описание о товаре.',
          photo: '/assets/img/catalog-item-img.jpg',
          price: 590
        }
      ]
    }
  },
  components: {
    CatalogItem,
    AddItemToShop,
    AddItemToFranch
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', this.title)
    }
  },
  mounted() {
    this.addTitle(this.title)
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
