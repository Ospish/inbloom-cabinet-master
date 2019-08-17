<template>
  <div class="social-table_row">
    <div class="social-box">
      <h3 class="social-box__title">{{ socialData.title }}</h3>
      <div class="social-box__link">
        <span class="unactive-link">{{ socialData.href }}</span>
        <button @click="idEnter" class="social-box__link-btn" v-if="!socialEnter">Введите ID</button>
        <input type="text" v-if="socialEnter">
      </div>
    </div>
    <div class="swither">
      <input type="checkbox" class="checkbox">
      <div class="knobs">
        <span>Нет</span>
        <span>Да</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['socialData'],
  data(){
    return{
      socialEnter: false
    }
  },
  methods: {
    idEnter() {
      this.socialEnter = true 
    }
  }
}
</script>