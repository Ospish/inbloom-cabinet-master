<template>
  <div class="request-item">
    <div class="request-item__title">Ваша заявка:</div>
    <div class="request-item__date">{{ itemData.date }}</div>
    <div class="request-item__buttons">
      <button class="btn-default big purple">В склад</button>
      <button class="btn-default big">Детали</button>
      <button class="btn-default big gray" @click="removeRequest">Отменить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestItem',
  props: ['itemData'],
  data() {
    return {

    }
  },
  methods: {
    removeRequest() {
      this.$emit('removeRequest', this.itemData.id)
    }
  }
}
</script>