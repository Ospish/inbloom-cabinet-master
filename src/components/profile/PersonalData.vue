<template>
  <form class="personal-data__form" action="">
    <input class="personal-data__input" type="text" name="surname" placeholder="Фамилия*">
    <input class="personal-data__input" type="text" name="name" placeholder="Имя*">
    <input class="personal-data__input" type="text" name="patronymic" placeholder="Отчество*">
    <input class="personal-data__input" type="tel" name="phone" placeholder="Телефон*">
    <input class="personal-data__input" type="email" name="email" placeholder="Корпоративный e-mail*">
    <div class="personal-data__small-inputs">
      <input class="personal-data__input small" type="text" name="city" placeholder="Город*">
      <input class="personal-data__input small" type="text" name="street" placeholder="Улица*">
      <input class="personal-data__input small" type="text" name="house" placeholder="Дом, строение*">
      <input class="personal-data__input small" type="text" name="office" placeholder="Офис">
    </div>
    <input class="personal-data__input" type="text" name="termAddr" placeholder="Адрес терминала транспортной компании">
    <div class="profile_save-changes">
      <button class="btn-default big gray">Отмена</button>
      <button type="submit" class="btn-default big purple-orange">Сохранить настройки</button>
    </div> 
  </form>
</template>

<script>
export default {
  name: 'PersonalData'
}
</script>
