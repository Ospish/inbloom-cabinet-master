<template>
  <form @change="inputChanged = false" class="personal-photo__form" action="" enctype="multipart/form-data">
    <p class="personal-data__text">Установите свой аватар, он отобразится на портале и на основном сайте. Рекомендуем установить фотографию, где хорошо видно Ваше лицо.</p>
    <div class="personal-data__photo-wrap">
      <div class="personal-data__photo">
        <img id="avatar" :src="userInfo.photo || noPhoto" >
      </div>
      <button type="button" class="personal-data__photo-btn" @change="look">
        <input id="upload" name="profile_image" type="file" accept="image/jpeg,image/png,image/gif" class="personal-data__photo-input" >
        Выбрать фото
      </button>
    </div>

    <div class="profile_save-changes">
      <button type="button" class="btn-default big gray">Отмена</button>
      <button type="button" @click="save" :disabled="inputChanged" class="btn-default big purple-orange">Сохранить фото</button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export default {
  name: 'Photo',
  computed : {
    ...mapGetters(['userId', 'userInfo', 'userPhoto', 'noPhoto'])
  },
  data(){
    return {
      image: null,
      inputChanged: false
    }
  },
  mounted(){

  },
  methods: {
    async look(e) {
      this.image = e.target.files[0];
      avatar.src = await toBase64(this.image)
    },
    async save(){
      this.inputChanged = true
      this.$store.commit('updateUserPhoto', await toBase64(upload.files[0]))
      this.$store.dispatch('uploadImage', {  file: this.image, type: 'profile', id: this.userId })
      this.$forceUpdate();
    },
  }
}

</script>
