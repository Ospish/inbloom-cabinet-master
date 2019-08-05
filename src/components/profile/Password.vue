<template>
  <form class="personal-data__form" action="">
    <input class="personal-data__input" type="password" name="old-pass" placeholder="Введите старый пароль">
    <input class="personal-data__input" type="password" name="new-pass" placeholder="Введите новый пароль">
    <input class="personal-data__input" type="password" name="check-pass" placeholder="Повторите пароль">
    <div class="profile_save-changes">
      <button class="btn-default big gray">Отмена</button>
      <button type="submit" class="btn-default big purple-orange">Сохранить пароль</button>
    </div> 
  </form>
</template>

<script>
export default {
  name: 'Password'
}
</script>

