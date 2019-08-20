<template>
  <div class="add-item-panel">
    <h3 class="add-item__title">Добавить товар на сайт: <span>+</span></h3>
    <form action="">
      <a href="#" class="add-item__image">
        <img src="" alt="">
        <span>Загрузить Фото</span>
        <input type="file" accept="image/jpeg,image/png,image/gif" class="add-item__photo-input" >
      </a>
      <div class="add-item__description">
        <h4>Наименование:</h4>
        <input type="text" name="name" class="add-item__input">
        <h4>Краткое описание товара:</h4>
        <textarea name="descript" rows="3"></textarea>
      </div>
      <div class="add-item__params">
        <div>
          <span class="add-item__params-title">Размер: </span>
          <div class="add-item__sizes">
            <div class="size-radio">
              <input id="size-S" type="radio" name="size" value="S" checked>
              <label for="size-S">S</label>
            </div>
            <div class="size-radio">
              <input id="size-M" type="radio" name="size" value="M">
              <label for="size-M">M</label>
            </div>
            <div class="size-radio">
              <input id="size-L" type="radio" name="size" value="L">
              <label for="size-L">L</label>
            </div>
          </div>
        </div>
        <div>
          <span class="add-item__params-title">Цветы:</span>
          <input type="text" name="flowers">
        </div>
        <div>
          <span class="add-item__params-title">Цвета (для роз): </span>
          <span class="rose-color"></span>
          <span class="rose-color"></span>
          <span class="rose-color"></span>
          <span class="rose-color"></span>
          <span class="rose-color"></span>
          <span class="rose-color"></span>
          <span class="rose-color"></span>
        </div>
        <div>
          <span class="add-item__params-title">Цвет коробки: </span>
          <span class="box-color"></span>
          <span class="box-color"></span>
          <span class="box-color"></span>
          <span class="box-color"></span>
          <span class="box-color"></span>
          <span class="box-color"></span>
          <span class="box-color"></span>
        </div>
        <div>
          <span class="add-item__params-title">Цена:</span>
          <input type="text" name="price">
        </div>
      </div>
      <div class="add-item__buttons">
        <button class="btn-default big purple-orange">Сохранить</button>
        <a class="add-item_remove-btn" href="#">Удалить</a>
      </div>  
    </form>
  </div>
</template>

<script>
export default {
  
}
</script>

