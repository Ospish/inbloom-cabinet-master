<template>
  <form class="personal-data__form" action="">
    <input class="personal-data__input" type="text" v-model="userInfo.surname" name="surname" placeholder="Фамилия*">
    <input class="personal-data__input" type="text" v-model="userInfo.name" name="name" placeholder="Имя*">
    <input class="personal-data__input" type="text" v-model="userInfo.patronymic" name="patronymic" placeholder="Отчество*">
    <input class="personal-data__input" type="tel" v-model="userInfo.phone"  name="phone" placeholder="Телефон*">
    <input class="personal-data__input" type="email" v-model="userInfo.email" name="email" placeholder="Корпоративный e-mail*">
    <div class="personal-data__small-inputs">
      <input class="personal-data__input small" type="text" v-model="userInfo.city" name="city" placeholder="Город*">
      <input class="personal-data__input small" type="text" v-model="userInfo.street" name="street" placeholder="Улица*">
      <input class="personal-data__input small" type="text" v-model="userInfo.house" name="house" placeholder="Дом, строение*">
      <input class="personal-data__input small" type="text" v-model="userInfo.office" name="office" placeholder="Офис">
    </div>
    <input class="personal-data__input" type="text" v-model="userInfo.termAddr" name="termAddr" placeholder="Адрес терминала транспортной компании">
    <div class="profile_save-changes">
      <button class="btn-default big gray">Отмена</button>
      <button type="button" @click="changeInfo" class="btn-default big purple-orange">Сохранить настройки</button>
    </div> 
  </form>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PersonalData',
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    changeInfo(){
      this.$store.dispatch('changeInfo', this.userInfo)
    }
  }

}
</script>
