<template>
  <div class="content-wrap">
    <button @click="addContent" class="btn-plus">+</button>
    <ContentItem  v-for="item in contentItems" :key="item.id" :itemData="item" @removeItem="removeItem"/>
  </div>
</template>

<script>

import ContentItem from '@/components/ContentItem.vue'

export default {
  name: 'Content',
  data() {
    return {
      title: 'Контент',
      contentItems: [
        { id: 1,
          descript: 'Тут небольшое, ну или большое описание про фото.',
          photo: '/assets/img/content-item-img.jpg'
        },
        { id: 2,
          descript: 'Тут небольшое описание про фото.',
          photo: '/assets/img/content-item-img.jpg'
        },
        { id: 3,
          descript: 'Тут небольшое описание про фото.',
          photo: '/assets/img/content-item-img.jpg'
        },
        { id: 4,
          descript: 'Тут небольшое описание про фото.',
          photo: '/assets/img/content-item-img.jpg'
        },
        { id: 5,
          descript: 'Тут небольшое описание про фото.',
          photo: '/assets/img/content-item-img.jpg'
        },
        { id: 6,
          descript: 'Тут небольшое описание про фото.',
          photo: '/assets/img/content-item-img.jpg'
        },
        { id: 7,
          descript: 'Тут небольшое описание про фото.',
          photo: '/assets/img/content-item-img.jpg'
        }
      ]
    }
  },
  components: {
    ContentItem
  },
  methods: {
    removeItem(id) {
      this.contentItems = this.contentItems.filter(item => item.id != id)
    },
    addTitle(title) {
      this.$emit('showTitle', title)
    },
    addContent() {
      this.contentItems.push({
        id: this.contentItems.length + 1,
        descript: '',
        photo: ''
        })
    }
  },
  mounted() {
    this.addTitle(this.title)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.content-wrap
  display: flex
  flex-wrap: wrap
.content-item
  margin: 2em
  margin-left: 0
@media (max-width: 767px)
  .content-item
    width: 30%
    margin: 1.5em 1.5%
    margin-left: 1.5%
@media (max-width: 350px) 
  .content-item
    width: 40%
    margin-right: 5%
    margin-left: 5% 
</style>
