<template>
  <div class="add-item-panel">
    <h3 class="add-item__title">Добавить товар для франчайзи: <span>+</span></h3>
    <form action="">
      <a href="#" class="add-item__image">
        <img src="" alt="">
        <span>Загрузить Фото</span>
        <input type="file" accept="image/jpeg,image/png,image/gif" class="add-item__photo-input" >
      </a>
      <div class="add-item__description width-20">
        <h4>Наименование:</h4>
        <input type="text" name="name" class="add-item__input">
      </div>
      <div class="add-item__description width-20">
        <h4>Описание:</h4>
        <input type="text" name="descript" class="add-item__input">
      </div>
      <div class="add-item__description width-20">
        <h4>Цена:</h4>
        <input type="text" name="price" class="add-item__input">
      </div>
      <div class="flex-col">
        <div class="add-item__description width-20">
          <h4>Наличие:</h4>
          <input type="checkbox" name="on-shelf" class="add-item__input">
        </div>
        <div class="add-item__buttons">
          <button class="btn-default big purple-orange">Сохранить</button>
          <a class="add-item_remove-btn" href="#">Удалить</a>
        </div>  
      </div>
    </form>
  </div>
</template>

<script>
export default {
  
}
</script>