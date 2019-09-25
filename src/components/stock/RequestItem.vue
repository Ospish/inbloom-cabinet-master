<template>
  <div class="request-item">
    <div class="request-item__title">Ваша заявка:</div>
    <div class="request-item__date">{{ itemData.created_at }}</div>
    <div class="request-item__buttons">
      <button @click="inStorage" class="btn-default big purple">В склад</button>
      <button @click="toggle" class="btn-default big">Детали</button>
      <button class="btn-default big gray" @click="editRequest([itemData, 'request_added'])">Отменить</button>
    </div>
    <div v-if="isOpen">
      Сумма: {{ itemData.value }} р.<br>
      Товары: {{ productString }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'RequestItem',
  props: ['itemData', 'itemCount'],
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapGetters(['shopInfo', 'stockInfo']),
    productString(){
      if (this.itemData.type == 1) return ''
      let str = ''
      console.log(this.itemData.posInfo_products)
      for (let x = 0; x < JSON.parse(this.itemData.posInfo_products).length; x++) {
        if (this.itemData.type == 2) {
          let index = this.stockInfo.findIndex(requests => requests.id == JSON.parse(this.itemData.posInfo_products)[x])
          if (x > 0) str += ', '
          str += this.stockInfo[index].name + ' x ' + JSON.parse(this.itemData.posInfo_quantity)[x]
        }
        else {
          let index = this.shopInfo.findIndex(requests => requests.id == JSON.parse(this.itemData.posInfo_products)[x])
          if (x > 0) str += ', '
          str += this.shopInfo[index].name + ' x ' + JSON.parse(this.itemData.posInfo_quantity)[x]
        }

      }
      return str
    },
  },
  created(){
  },
  methods: {
    ...mapActions(['pushProductStock', 'editRequest', 'deleteRequest']),
    /*
    removeRequest() {
      this.$emit('removeRequest', this.itemData.id)
    },
    */
    toggle(){
      this.isOpen = this.isOpen != true;
    },
    inStorage(){
      for (let x = 0; x < JSON.parse(this.itemData.posInfo_products).length; x++) {
        this.pushProductStock({ id: JSON.parse(this.itemData.posInfo_products)[x], quantity: JSON.parse(this.itemData.posInfo_quantity)[x], details: this.productString })
        this.editRequest([this.itemData, 'request_closed'])
      }
    }
  }
}
</script>
