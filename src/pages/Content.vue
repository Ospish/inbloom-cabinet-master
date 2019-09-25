<template>
  <div class="content-wrap">
    <button v-if="isAdmin" @click="addContentItem" class="btn-plus">+</button>
    <ContentItem  v-for="item in contentInfo" :key="item.id" :itemData="item" :isAdding="isAdding" @removeItem="deleteContent"/>
  </div>
</template>

<script>

import ContentItem from '@/components/ContentItem.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Content',
  computed: mapGetters(['isAdmin', 'contentInfo']),
  data () {
    return {
      title: 'Контент',
      isAdding: false
    }
  },
  components: {
    ContentItem
  },
  methods: {
    ...mapActions(['loadContent', 'deleteContent', 'addContent']),
    addTitle(title) {
      this.$emit('showTitle', title)
    },

    addContentItem() {
      this.isAdding = true
      this.contentInfo.push({
        id: this.contentInfo.length + 1,
        descript: '',
        photo: ''
      })
      this.addContent()
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
