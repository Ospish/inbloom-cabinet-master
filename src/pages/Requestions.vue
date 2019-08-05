<template>
  <div class="requestions-container">
    <RequestItem  v-for="request in requestions" :key="request.id" :itemData="request" @remove="removeRequest"/>
  </div>
</template>

<script>

import RequestItem from '@/components/RequestBox.vue'

export default {
  name: 'Requestions',
  data() {
    return {
      title: 'Заявки',
      requestions: [
        { id: 1,
          articul: '',
          total: {title: 'ИБ-2104', date: '14.04.2019', name: 'Сергей', type: 'Сборный букет', sum: 1290},
          contacts: {tel: '8 914 6000 900', receiptDate: '25.07.2019'},
          posyInfo: {size: 'M', flowers: 'Роза, Одуванчик', colors: 'зеленый, белый, оранжевый', boxColor: 'белый'},
          congratulation: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Пустился бросил, буквоград однажды текстов несколько залетают реторический первую переписали.',
          photo: '' 
        },
        { id: 2,
          articul: '',
          total: {title: 'ИБ-2105', date: '14.05.2019', name: 'Сергей', type: 'Сборный букет', sum: 1290},
          contacts: {tel: '8 914 6000 900', receiptDate: '25.07.2019'},
          posyInfo: {size: 'M', flowers: 'Роза, Одуванчик', colors: 'зеленый, белый, оранжевый', boxColor: 'белый'},
          congratulation: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Пустился бросил, буквоград однажды текстов несколько залетают реторический первую переписали.',
          photo: '' 
        },
        { id: 3,
          articul: '003-310',
          total: {title: 'ИБ-2106', date: '14.06.2019', name: 'Сергей', type: 'Сборный букет', sum: 1290},
          contacts: {tel: '8 914 6000 900', receiptDate: '25.07.2019'},
          posyInfo: {size: 'M', flowers: 'Роза, Одуванчик', colors: 'зеленый, белый, оранжевый', boxColor: 'белый'},
          congratulation: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Пустился бросил, буквоград однажды текстов несколько залетают реторический первую переписали.',
          photo: '@/assets/img/flowers/photo.jpg' 
        },
        { id: 4,
          articul: '003-310',
          total: {title: 'ИБ-2107', date: '14.07.2019', name: 'Сергей', type: 'Сборный букет', sum: 1290},
          contacts: {tel: '8 914 6000 900', receiptDate: '25.07.2019'},
          posyInfo: {size: 'M', flowers: 'Роза, Одуванчик', colors: 'зеленый, белый, оранжевый', boxColor: 'белый'},
          congratulation: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Пустился бросил, буквоград однажды текстов несколько залетают реторический первую переписали.',
          photo: '@/assets/img/flowers/photo.jpg' 
        },
        { id: 5,
          articul: '003-310',
          total: {title: 'ИБ-2108', date: '14.08.2019', name: 'Сергей', type: 'Сборный букет', sum: 1290},
          contacts: {tel: '8 914 6000 900', receiptDate: '25.07.2019'},
          posyInfo: {size: 'M', flowers: 'Роза, Одуванчик', colors: 'зеленый, белый, оранжевый', boxColor: 'белый'},
          congratulation: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Пустился бросил, буквоград однажды текстов несколько залетают реторический первую переписали.',
          photo: '@/assets/img/flowers/photo.jpg' 
        },
        { id: 6,
          articul: '',
          total: {title: 'ИБ-2109', date: '14.09.2019', name: 'Сергей', type: 'Сборный букет', sum: 1290},
          contacts: {tel: '8 914 6000 900', receiptDate: '25.07.2019'},
          posyInfo: {size: 'M', flowers: 'Роза, Одуванчик', colors: 'зеленый, белый, оранжевый', boxColor: 'белый'},
          congratulation: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Пустился бросил, буквоград однажды текстов несколько залетают реторический первую переписали.',
          photo: '' 
        },
        { id: 7,
          articul: '003-310',
          total: {title: 'ИБ-2110', date: '14.10.2019', name: 'Сергей', type: 'Сборный букет', sum: 1290},
          contacts: {tel: '8 914 6000 900', receiptDate: '25.07.2019'},
          posyInfo: {size: 'M', flowers: 'Роза, Одуванчик', colors: 'зеленый, белый, оранжевый', boxColor: 'белый'},
          congratulation: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Пустился бросил, буквоград однажды текстов несколько залетают реторический первую переписали.',
          photo: '@/assets/img/flowers/photo.jpg' 
        }
      ]
    }
  },
  components: {
    RequestItem
  },
  methods: {
    removeRequest(id) {
      this.requestions = this.requestions.filter(item => item.id !== id)
    },
    addTitle(title) {
      this.$emit('showTitle', this.title)
    }
  },
  mounted() {
    this.addTitle(this.title)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.requestions-container
  display: flex
  flex-wrap: wrap
.requestion-wrap
  margin: .8em
  &.opened
    width: 100%
    display: flex
    .requestion-box:first-child
      margin-right: 1.6em

@media (max-width: 1600px) 
  .requestion-box
    &.opened
      width: 55em 
    &__col
      min-width: 25%
  
@media (max-width: 1024px)
  .requestions-container
    padding: 0 2.5em
    justify-content: space-between
  .requestion-wrap.opened
    flex-wrap: wrap
		.requestion-box:first-child
			margin-bottom: 1.5em
			margin-right: 0
  .requestion-box.opened
    width: 100%
@media (max-width: 767px)
  .requestions-container
    padding: 0
  .requestion-wrap
    margin: 0
    margin-bottom: 1.5em
  .requestion-box
    padding: 1.5em
  .remove-requestion
    width: 100%
    textarea
      width: 100%
  .requestion-wrap.opened .requestion-box:first-child
    width: 22em
@media (max-width: 364px)
  .requestions-container
    justify-content: center
</style>
