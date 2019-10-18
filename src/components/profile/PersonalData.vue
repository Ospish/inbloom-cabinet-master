<template>
  <form class="personal-data__form" @change="inputChanged = false" action="">
    <input class="personal-data__input" type="text" v-model="userInfo.surname" name="surname" placeholder="Фамилия*">
    <input class="personal-data__input" type="text" v-model="userInfo.name" name="name" placeholder="Имя*">
    <input class="personal-data__input" type="text" v-model="userInfo.patronymic" name="patronymic" placeholder="Отчество*">
    <vue-phone-number-input class="personal-data__input" v-model="userInfo.phone" @update="onUpdate" noExample :default-country-code="currentCode" :preferred-countries="['RU', 'UA', 'BY', 'KZ']" no-validator-state :translations="translations"/>
<!--    <input class="personal-data__input" type="tel" v-model="userInfo.phone" ref="phone" name="phone" placeholder="Телефон*">-->
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
import VuePhoneNumberInput from 'vue-phone-number-input'


export default {
  name: 'PersonalData',
  computed: {
    ...mapGetters(['userInfo']),
  },
  mounted () {
    this.countrycode = this.userInfo.countrycode ? this.userInfo.countrycode : '7'
    if (this.userInfo.countrycode == 7) this.currentCode = "RU"
    if (this.userInfo.countrycode == 375) this.currentCode = "BY"
    if (this.userInfo.countrycode == 380) this.currentCode = "UA"
    if (this.userInfo.countrycode == 374) this.currentCode = "AM"
    if (this.userInfo.countrycode == 373) this.currentCode = "MD"
    if (this.userInfo.countrycode == 372) this.currentCode = "EE"
    if (this.userInfo.countrycode == 371) this.currentCode = "LV"
    if (this.userInfo.countrycode == 370) this.currentCode = "LT"
    if (this.userInfo.countrycode == 359) this.currentCode = "BG"
    if (this.userInfo.countrycode == 358) this.currentCode = "FI"
    if (this.userInfo.countrycode == 998) this.currentCode = "UZ"
    if (this.userInfo.countrycode == 996) this.currentCode = "KG"
    if (this.userInfo.countrycode == 995) this.currentCode = "GE"
    if (this.userInfo.countrycode == 994) this.currentCode = "AZ"
    if (this.userInfo.countrycode == 993) this.currentCode = "TM"
    if (this.userInfo.countrycode == 992) this.currentCode = "TJ"

  },
  data(){
    return {
      inputChanged: false,
      countrycode: '',
      results: {},
      currentCode: '',
      translations: {
        countrySelectorLabel: 'Код страны',
        countrySelectorError: 'Выберите код',
        phoneNumberLabel: 'Ваш номер телефона',
        example: 'Пример :'
      }
    }
  },
  methods: {
    changeInfo () {
      let info = Object.assign({}, this.userInfo)
      info.countrycode = this.countrycode
      this.$store.commit('updateInfo', info)
      this.$store.dispatch('setInfo')
      this.inputChanged = true
    },
    onUpdate(payload) {
      this.results = payload
      console.log(payload.e164)
      var start = payload.e164.indexOf(payload.nationalNumber);
      this.countrycode = payload.e164.substring(1, start);
      console.log(this.countrycode)
    }
  },
  components: {
    VuePhoneNumberInput
  }

}
</script>

<style>
  @import '../../../node_modules/vue-phone-number-input/dist/vue-phone-number-input.css';
  .vue-phone-number-input {
    padding: 0;
    display: flex !important;
  }
</style>
