<template>
  <div class="requestion-wrap" :class="{ opened: isOpen }">
    <div class="requestion-box" :class="{ 'remove-overlay': isRemove }">
      <h3 class="requestion-title">Заявка IB-{{ itemData.id }}</h3>
      <p style="font-weight: bold; margin: -5px 0 5px 0">{{ itemDateString }}</p>
      <p class="requestion-name">{{ userNameString }}</p>
      <p class="requestion-type">Тип: {{ itemTypeString }}</p>
      <p class="requestion-type">Статус: {{ itemStatusString }}</p>
      <p v-if="itemData.value != undefined" class="requestion-sum">Сумма: {{ itemData.value }} р.</p>
      <p v-if="itemData.value == undefined" class="requestion-sum">Сумма не указана</p>
      <p v-if="itemData.type == 2">Товары: {{ productString }}</p>
      <button class="btn-default big" onclick="JSCloseAll()" @click="closeAll" v-if="!isOpen">Открыть</button>
        <template v-if="isOpen && isDone && itemData.status != 'request_sent'">
          <button class="btn-no" @click="isDone = false">Нет</button>
          <button class="btn-yes" @click="finish">Да</button>
        </template>
          <button class="btn-default big purple" @click="isDone = true" v-if="showClose">Провести</button>

      <a href="#" class="remove-request__btn" @click="isRemove = true" v-if="isOpen && isAdmin && isDone == false">Удалить</a>
    </div>


    <div v-if="itemData.type != 2 && isOpen & !isRemove" class="requestion-box opened">
      <span class="requestion-box__close" @click="isOpen = false">x</span>
      <div class="requestion-box__col">
        <h3 class="requestion-title">Контакты:</h3>
        <p>Имя: {{ itemData.posInfo_name }}</p>
        <p>Город: {{ itemData.city }}</p>
        <p>Тел.: {{ itemData.phone }}</p>
        <p>Дата получения: <br>{{ this.itemData.receiveDate.split(" ")[0] }}</p>
        <p>Время получения: <br>{{ this.itemData.receiveDate.split(" ")[1] }}</p>
      </div>
      <!-- <div  class="requestion-box__col" v-if="itemData.photo != '' && itemData.type != 2">
        <h3 v-if="itemData.type != 1" class="requestion-title">Фото:</h3>
        <img class="requestion-box__photo" :src="itemPhoto" alt="">
      </div> -->
      <div v-if="itemData.type != 2" class="requestion-box__col">
        <h3 class="requestion-title">Данные:</h3>
        <div>
        <p>Размер букета: {{ itemData.posInfo_size || "Не выбран" }}</p>
        <p>Цветы: {{ flowersStr(itemData.posInfo_colors) || "Не выбраны" }}</p>
        <p>Цвет коробки: {{ boxColors[itemData.posInfo_boxColor] || "Не выбран" }}</p>
        </div>
        <p v-if="itemData.type != 1">Товары: {{ productString }}</p>
      </div>
      <div v-if="itemData.type == 1" class="requestion-box__col" >
        <h3 class="requestion-title">Поздравление:</h3>
        <p>{{ itemData.congrats || 'Поздравление не выбрано' }}</p>
      </div>
    </div>

    <div class="requestion-box remove-requestion" v-if="isRemove">
      <h3 class="requestion-title">Укажите причину удаления:</h3>
      <form action="">
        <textarea v-model="cause" name="comment" cols="40" rows="5" placeholder="Обязательно введите причину удаления заявки (не менее 3х символов)"></textarea>
        <p>
          <input :disabled="cause.length < 3" class="remove-requestion__input" type="button" @click="removeItem" value="Удалить"> / <a @click="isRemove = false" class="cancel-remove">Отменить удаление</a>
        </p>
      </form>
    </div>

  </div>
</template>



<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'RequestItem',
  props: ['itemData', 'value'],
  computed: {
    ...mapGetters(['isAdmin', 'basketInfo', 'shopInfo', 'stockInfo']),
    itemTypeString() {
      if (this.itemData.type == 0) return "Каталог"
      if (this.itemData.type == 1) return "Квиз"
      if (this.itemData.type == 2) return "Внутренняя"
    },
    itemStatusString(){
      if (this.itemData.status == 'request_added') return "Новая"
      if (this.itemData.status == 'request_sent') return "Заказ отправлен"
    },
    itemDateString(){
      return this.itemData.created_at.split(" ")[1] + " " + this.itemData.created_at.split(" ")[0]
    },
    receiveDateString(index){
      return this.itemData.receiveDate.split(" ")[index]
    },
    userNameString(){
      if (this.itemData.length > 0) return '-Нет имени-'
      else return this.itemData.name
    },
    productString(){
      if (this.itemData.type == 1) return ''
      let str = ''
      console.log(this.itemData.posInfo_products)
      console.log(this.itemData.posInfo_products)
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
    showClose(){
      if (this.isOpen && this.itemData.status != 'request_sent') {
        if (this.itemData.type != 2) return true
        else {
          if (this.isAdmin) return true
        }
      }
      return false
    },
    itemPhoto(){
      return 'http://ibapi.fobesko.com/public/api/file/blob/store/' + this.itemData.posInfo_products
    }
  },
  data () {
    return {
      isOpen: false,
      isRemove: false,
      isDone: false,
      cause : '',
      requestProductIds: [this.itemData.posInfo_products],
      requestProductVal: [this.itemData.posInfo_quantity],
      flColors: ["Красный", "Оранжевый", "Желтый", "Зеленый", "Голубой", "Синий", "Фиолетовый", "Белый", "Черный"],
      boxColors: ["Красная", "Оранжевая", "Желтая", "Зеленая", "Голубая", "Синяя", "Фиолетовая", "Белая", "Черная"],
      flowers: ["Роза", "Сакура", "Гортензия", "Гербера", "Георгин", "Пион", "Хризантема", "Гвоздика"]
    }
  },
  mounted () {
    this.updateValue()
  },
  methods: {
    ...mapActions(['addRequest', 'editRequest']),
    updateValue: function () {
      this.$emit('input', this.value + 1);
    },
    closeAll () {
      this.isOpen = true
    },
    removeItem () {
      this.$emit('remove', this.itemData);
    },
    flowersStr(colorData){
      var str = ''
      if (colorData) {
        for (var i = 0; i < JSON.parse(colorData).length; i++) {
          console.log(this.itemData.posInfo_flowers)
          str += this.flowers[this.itemData.posInfo_flowers[i]] + ' ('
          for (var x = 0; x < JSON.parse(colorData)[i].length; x++) {
            if (JSON.parse(colorData)[i][x] == 1) {
              if (str.slice(-1) != '(') str += ', '
              str += this.flColors[x]
            }
          }
          str += '), '
          console.log(str)
          //str += this.colors[itemData[0][0]] + ', ' + this.colors[itemData[0][1]]
        }
        //return this.colors[str]
      }
      return str
    },
    finish(){
      if (this.itemData.type != 2) this.editRequest([this.itemData, 'request_closed']);
      else this.editRequest([this.itemData, 'request_sent']);
      this.removeItem
    }
    },
}
</script>
