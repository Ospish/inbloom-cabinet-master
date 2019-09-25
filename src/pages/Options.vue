<template>
  <form class="personal-data__form" @change="inputChanged = false" action="">
    <div class="personal-data__small-inputs">
      <input v-for="(item, index) in colors" class="personal-data__input options_small-inputs small" type="text" v-model="colors[index]" placeholder="Введите цвет">
    </div>
    <div class="personal-data__small-inputs">
      <input v-for="(item, index) in flowers" class="personal-data__input options_small-inputs small" type="text" v-model="flowers[index]" placeholder="Введите цветок">
    </div>
    <div class="add-item__params">
      <div >
      <span class="add-item__params-title">Цвета (для роз): </span>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-0" value="0">
        <label style="background-color: red" class="rose-color" for="roseColor-0"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-1" value="1">
        <label style="background-color: orange" class="rose-color" for="roseColor-1"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-2" value="2">
        <label style="background-color: yellow" class="rose-color" for="roseColor-2"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-3" value="3">
        <label style="background-color: green" class="rose-color" for="roseColor-3"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-4" value="4">
        <label style="background-color: cornflowerblue" class="rose-color" for="roseColor-4"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-5" value="5">
        <label style="background-color: blue" class="rose-color" for="roseColor-5"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-6" value="6">
        <label style="background-color: purple" class="rose-color" for="roseColor-6"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-7" value="7">
        <label style="background-color: white" class="rose-color" for="roseColor-7"></label>
      </div>
      <div class="rose-color-wrap">
        <input type="radio" name="roseColor" id="roseColor-8" value="8">
        <label style="background-color: black" class="rose-color" for="roseColor-8"></label>
      </div>
    </div>
    <div>
      <span class="add-item__params-title">Цвета коробки: </span>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-0" value="0">
        <label style="background-color: red" for="boxColor-0" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-1" value="1">
        <label style="background-color: orange" for="boxColor-1" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-2" value="2">
        <label style="background-color: yellow" for="boxColor-2" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-3" value="3">
        <label style="background-color: green" for="boxColor-3" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-4" value="4">
        <label style="background-color: cornflowerblue" for="boxColor-4" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-5" value="5">
        <label style="background-color: blue" for="boxColor-5" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-6" value="6">
        <label style="background-color: purple" for="boxColor-6" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor"  id="boxColor-7" value="7">
        <label style="background-color: white" for="boxColor-7" class="box-color"></label>
      </div>
      <div class="box-color-wrap">
        <input type="radio" name="boxColor" id="boxColor-8" value="8">
        <label style="background-color: black" for="boxColor-8" class="box-color"></label>
      </div>
    </div>
    </div>
    <div class="profile_save-changes">
      <button type="button" class="btn-default big gray">Отмена</button>
      <button type="button" @click="changeInfo(true)" :disabled="inputChanged" class="btn-default big purple-orange">Сохранить настройки</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Options',
  computed: {
    ...mapGetters(['isAdmin', 'historyInfo', 'requestInfo', 'userId']),
    orderedRequests: function () {
      return _.orderBy(this.requestInfo, 'id', 'desc')
    }
  },
  data () {
    return {
      currentTab: '',
      title: 'Настройки опроса',
      colors: ['Красный', 'Оранжевый', 'Желтый', 'Зеленый', 'Голубой', 'Синий', 'Фиолетовый', 'Белый', 'Черный'],
      flowers: ['Розы', 'Ипомеи', 'Хризантемы']
    }
  },
  components: {
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', this.title)
    },
  },

  mounted() {
    this.addTitle(this.title)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.options_small-inputs:nth-child(5)
  flex-wrap: wrap
//@media (max-width: 767px)
</style>
