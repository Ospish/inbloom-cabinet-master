<template>
  <div class="requestion-wrap" :class="{ opened: isOpen }">
    <div class="requestion-box" :class="{ 'remove-overlay': isRemove }">
      <h3 class="requestion-title">Заявка {{ itemData.total.title }} от {{ itemData.total.date }}</h3>
      <p class="requestion-name">{{ itemData.total.name }}</p>
      <p class="requestion-type">Тип: {{ itemData.total.type }}</p>
      <p class="requestion-sum">Сумма: от {{ itemData.total.sum }} р.</p>
      <button class="btn-default big" @click="isOpen = true" v-if="!isOpen">Открыть</button>
      <button class="btn-default big purple" v-if="isOpen">Провести</button>
      <a href="#" class="remove-request__btn" @click="isRemove = true" v-if="isOpen">Удалить</a>   
    </div>


    <div class="requestion-box opened" v-if="isOpen & !isRemove">
      <span class="requestion-box__close" @click="isOpen = false">x</span>
      <div class="requestion-box__col"> 
        <h3 class="requestion-title">Контакты:</h3>
        <p>Имя: {{ itemData.total.name }}</p>
        <p>Тел.: {{ itemData.contacts.tel }}</p>
        <p>Дата получения: {{ itemData.contacts.receiptDate }}</p>
      </div>
      <div class="requestion-box__col" v-if="itemData.photo != ''">
        <h3 class="requestion-title">Фото:</h3>
        <img class="requestion-box__photo" :src="itemData.photo" alt="">
      </div> 
      <div class="requestion-box__col">
        <h3 class="requestion-title">Данные:</h3>
        <p>Размер букета: {{ itemData.posyInfo.size }}</p>
        <p>Цветы: {{ itemData.posyInfo.flowers }}</p>
        <p>Цвета: {{ itemData.posyInfo.colors }}</p>
        <p>Цвет коробки: {{ itemData.posyInfo.boxColor }}</p>
        <p v-if="itemData.articul !== ''" >Артикул товара: {{ itemData.articul }}</p>
      </div>
      <div class="requestion-box__col" v-if="itemData.photo === ''">
        <h3 class="requestion-title">Поздравление:</h3>
        <p>{{ itemData.congratulation }}</p>
      </div> 
    </div>

    <div class="requestion-box remove-requestion" v-if="isRemove">
      <h3 class="requestion-title">Укажите причину удаления:</h3>
      <form action="">
        <textarea name="comment" cols="40" rows="5"></textarea>
        <p>
          <input class="remove-requestion__input" type="button" @click="removeItem" value="Удалить"> / <a @click="isRemove = false" class="cancel-remove">Отменить удаление</a>
        </p> 
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RequestItem',
  props: ['itemData'],
  data() {
    return {
      isOpen: false,
      isRemove: false
    }
  },
  methods: {
    removeItem() {
      this.$emit('remove', this.itemData.id);
    }
  }
}
</script>
