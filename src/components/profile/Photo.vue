<template>
  <form class="personal-photo__form" action="">
    <p class="personal-data__text">Установите свой аватар, он отобразится на портале и на основном сайте. Рекомендуем установить фотографию, где хорошо видно Ваше лицо.</p>
    <div class="personal-data__photo-wrap">
      <div class="personal-data__photo">
        <img src="" alt="">
        <span>Нет фото :(</span>
      </div>
      <button class="personal-data__photo-btn">Выбрать фото</button>
    </div>

    <div class="profile_save-changes">
      <button class="btn-default big gray">Отмена</button>
      <button type="submit" class="btn-default big purple-orange">Сохранить фото</button>
    </div> 
  </form>
</template>

<script>
export default {
  name: 'Photo'
}
</script>
