<template>
  <div class="add-item-panel">
    <h3 class="add-item__title">Добавить товар на сайт: <span>+</span></h3>
    <form action="">
      <label class="add-item__image">
        <img id="avatar" :src="itemData.photo || noPhoto" alt="">
        <input id="upload" @change="sync" type="file"  accept="image/jpeg,image/png,image/gif" class="add-item__photo-input" >
      </label>
      <div class="add-item__description">
        <h4>Наименование:</h4>
        <input type="text" v-model="itemData.name" class="add-item__input">
        <h4>Краткое описание товара:</h4>
        <textarea v-model="itemData.description" rows="3"></textarea>
      </div>
      <div class="add-item__params">
        <div>
          <span class="add-item__params-title">Размер: </span>
          <div class="add-item__sizes">
            <div class="size-radio">
              <input id="size-S" name="size" type="radio" v-model="itemData.posInfo_size" value="S">
              <label for="size-S">S</label>
            </div>
            <div class="size-radio">
             <input id="size-M" name="size" type="radio" v-model="itemData.posInfo_size" value="M">
              <label for="size-M">M</label>
            </div>
            <div class="size-radio">
              <input id="size-L" name="size" type="radio" v-model="itemData.posInfo_size" value="L">
              <label for="size-L">L</label>
            </div>
          </div>
        </div>
        <div>
          <span class="add-item__params-title">Цветы:</span>
          <input type="text" v-model="itemData.posInfo_flowers">
        </div>
        <div>
          <span class="add-item__params-title">Цвета (для роз): </span>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-0" value="0">
            <label style="background-color: red" class="rose-color" for="roseColor-0"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-1" value="1">
            <label style="background-color: orange" class="rose-color" for="roseColor-1"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-2" value="2">
            <label style="background-color: yellow" class="rose-color" for="roseColor-2"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-3" value="3">
            <label style="background-color: green" class="rose-color" for="roseColor-3"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-4" value="4">
            <label style="background-color: cornflowerblue" class="rose-color" for="roseColor-4"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-5" value="5">
            <label style="background-color: blue" class="rose-color" for="roseColor-5"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-6" value="6">
            <label style="background-color: purple" class="rose-color" for="roseColor-6"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-7" value="7">
            <label style="background-color: white" class="rose-color" for="roseColor-7"></label>
          </div>
          <div class="rose-color-wrap">
            <input type="radio" name="roseColor" v-model="itemData.posInfo_colors" id="roseColor-8" value="8">
            <label style="background-color: black" class="rose-color" for="roseColor-8"></label>
          </div>
        </div>
        <div>
          <span class="add-item__params-title">Цвет коробки: </span>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-0" value="0">
            <label style="background-color: red" for="boxColor-0" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-1" value="1">
            <label style="background-color: orange" for="boxColor-1" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-2" value="2">
            <label style="background-color: yellow" for="boxColor-2" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-3" value="3">
            <label style="background-color: green" for="boxColor-3" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-4" value="4">
            <label style="background-color: cornflowerblue" for="boxColor-4" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-5" value="5">
            <label style="background-color: blue" for="boxColor-5" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-6" value="6">
            <label style="background-color: purple" for="boxColor-6" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-7" value="7">
            <label style="background-color: white" for="boxColor-7" class="box-color"></label>
          </div>
          <div class="box-color-wrap">
            <input type="radio" name="boxColor" v-model="itemData.posInfo_boxColor" id="boxColor-8" value="8">
            <label style="background-color: black" for="boxColor-8" class="box-color"></label>
          </div>
        </div>
        <div>
          <span class="add-item__params-title">Цена:</span>
          <input type="text" v-model="itemData.price">
        </div>
      </div>
      <div class="add-item__buttons">
        <button type="button" v-if="isEdited >= 0" @click="save()" class="btn-default big purple-orange">Сохранить</button>
        <button type="button" v-if="isEdited < 0" @click="create()" class="btn-default big purple-orange">Создать</button>
        <a class="add-item_remove-btn" @click="deleteProduct(itemData)">Удалить</a>
      </div>
    </form>
  </div>
</template>

<script>
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });


  import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['itemData'],
  computed: {
    ...mapGetters(['isAdmin', 'isEdited', 'noPhoto', 'shopType', 'shopInfo']),
      /*posInfo() {
        return JSON.parse(this.itemData.posInfo)
      },
    avatarSrc(){
      if (typeof this.itemData.id == 'undefined') {return ''}
      let src = 'https://ibapi.fobesko.com/public/api/file/blob/store/' + this.itemData.id
      if (src) return src
      else return 'https://inbloomshop.ru/nophoto.jpg'
    }
       */
  },

  methods: {
    ...mapActions(['addProduct', 'editProduct', 'deleteProduct', 'shopItemPhoto']),
    async save() {

      if (this.editProduct(this.itemData) && upload.files[0]) {
        this.$store.commit('updateShopPhoto', [this.itemData.id, avatar.src])
        this.$forceUpdate();
        this.$store.dispatch('uploadImage', { file: upload.files[0], type: 'store', id: this.itemData.id })
      }
    },
    async create() {
      let item = this.itemData
      let id = -1
      this.shopInfo.forEach(function (element) {
        if (element.id > id) id = element.id
      })
      item.id = id+1
      if (this.addProduct(item) && upload.files[0]) {
        item.photo = avatar.src
        this.$store.commit('updateShopPhoto', [item.id, avatar.src])
        this.$store.dispatch('uploadImage', { file: upload.files[0], type: 'store', id: item.id })
        this.$forceUpdate();
      }
    },
    async sync (e) {
      avatar.src = await toBase64(e.target.files[0])
    }
  },
  data(){
    return {
      imgSrc: '',
      size: null,
      flowers: null
    }
  },
  mounted () {
    this.itemData.type = 'store'
  }
}
</script>
