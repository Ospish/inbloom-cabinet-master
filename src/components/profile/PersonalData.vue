<template>
  <form class="personal-data__form" @change="inputChanged = false" action="">
    <input class="personal-data__input" type="text" v-model="userInfo.surname" name="surname" placeholder="Фамилия*">
    <input class="personal-data__input" type="text" v-model="userInfo.name" name="name" placeholder="Имя*">
    <input class="personal-data__input" type="text" v-model="userInfo.patronymic" name="patronymic" placeholder="Отчество*">
    <input class="personal-data__input" type="tel" v-model="userInfo.phone" id="phone" name="phone" placeholder="Телефон*">
    <input class="personal-data__input" type="email" v-model="userInfo.corp_email" name="email" placeholder="Корпоративный e-mail*">
    <div class="personal-data__small-inputs">
      <input class="personal-data__input small" type="text" v-model="userInfo.city" name="city" placeholder="Город*">
      <input class="personal-data__input small" type="text" v-model="userInfo.street" name="street" placeholder="Улица*">
      <input class="personal-data__input small" type="text" v-model="userInfo.building" name="house" placeholder="Дом, строение*">
      <input class="personal-data__input small" type="text" v-model="userInfo.office" name="office" placeholder="Офис">
    </div>
    <input class="personal-data__input" type="text" v-model="userInfo.termAddr" name="termAddr" placeholder="Адрес терминала транспортной компании">
    <div class="profile_save-changes">
      <button type="button" class="btn-default big gray">Отмена</button>
      <button type="button" @click="changeInfo(true)" :disabled="inputChanged" class="btn-default big purple-orange">Сохранить настройки</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import Inputmask from 'inputmask'

export default {
  name: 'PersonalData',
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted () {
    var im = new Inputmask("+7(999)-999-9999");
    im.mask(document.getElementById('phone'));
  },
  data(){
    return {
      inputChanged: false
    }
  },
  methods: {
    changeInfo () {
      this.$store.commit('updateInfo', this.userInfo)
      this.$store.dispatch('setInfo')
      this.inputChanged = true
    }
  }

}
</script>
