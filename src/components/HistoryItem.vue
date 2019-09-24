<template>
  <div class="history-item">
    <p>
      <span>Заявка #{{ itemData.id }} от {{ itemData.updated_at }}</span>
    </p>
    <p v-if="isAdmin">Пользователь: {{ itemData.name }}</p>
    <p>Тип: {{ typeString }}</p>
    <p>Статус: {{ status }}</p>
    <p>Товары: {{ productString }}</p>
    <p>Сумма: {{ itemData.value }} р.</p>
    <div class="history-item__buttons">
      <button v-if="itemData.userid == userId" @click="cancelRequest" class="btn-default gray">Отмена</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ItemInBasket',
    props: ['itemData'],
    data () {
      return {
        isOpen: false,
      }
    },
    computed: {
      ...mapGetters(['isAdmin', 'shopInfo', 'stockInfo', 'userId']),
      action(){
        if (this.itemData.status == 'request_closed') return 'Заявка'
        if (this.itemData.status == 'request_arrived') return 'Заявка'
        if (this.itemData.status == 'request_added') return 'Заявка'
        else return 'null'
      },
      status(){
        if (this.itemData.status == 'request_added') return 'Новая'
        if (this.itemData.status == 'request_closed') return 'Закрыта'
        if (this.itemData.status == 'request_arrived') return 'Доставлена'
        if (this.itemData.status == 'request_deleted') return 'Удалена'
        else return 'null'
      },
      typeString() {
        if (this.itemData.type == 0) return "Каталог"
        if (this.itemData.type == 1) return "Квиз"
        if (this.itemData.type == 2) return "Внутренняя"
      },
      productString(){
        if (this.itemData.type == 1) return ''
        let str = ''
        console.log(this.itemData.posInfo_products)
        for (let x = 0; x < JSON.parse(this.itemData.posInfo_products).length; x++) {
          if (this.itemData.type == 2) {
            let index = this.stockInfo.findIndex(requests => requests.id == JSON.parse(this.itemData.posInfo_products)[x])
            if (typeof this.stockInfo[index] == 'undefined') return ''
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
    methods: {
      ...mapActions(['editRequest', 'pullProductStock']),
      removeItems() {
        this.$emit('removeRow', this.itemData.id)
      },
      toggle(){
        if (this.isOpen == true) this.isOpen = false
        else this.isOpen = true
      },
      cancelRequest(){
        if (this.itemData.type == 2) {
          for (let x = 0; x < JSON.parse(this.itemData.posInfo_products).length; x++) {
            this.pullProductStock({ id: JSON.parse(this.itemData.posInfo_products)[x], quantity: JSON.parse(this.itemData.posInfo_quantity)[x], details: this.productString })
            this.editRequest([this.itemData, 'request_sent'])
          }
        }
        else this.editRequest([this.itemData, 'request_added'])
      }
    }
  }
</script>

<style lang="sass">

</style>
