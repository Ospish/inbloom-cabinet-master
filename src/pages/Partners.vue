<template>
  <div class="partners-wrap">
    <PartnerItem  v-for="item in partnerItems" :key="item.id" :itemData="item" @removeItem="removeItem"/>
  </div>
</template>

<script>

import PartnerItem from '@/components/PartnerItem.vue'

export default {
  name: 'Partners',
  data() {
    return {
      title: 'Партнеры',
      partnerItems: [
        { id: 1,
          photo: '/assets/img/content-item-img.jpg',
          name: 'Сергей',
          city: 'Благевещенск',
          socials: {
            vk: 'https://vk.com/',
            instagram: 'https://instagram.com/',
            telegram: 'https://t.me/',
            whatsapp: 'https://api.whatsapp.com/send?phone='
          }
        },
        { id: 2,
          photo: '/assets/img/content-item-img.jpg',
          name: 'Сергей',
          city: 'Благевещенск',
          socials: {
            vk: 'https://vk.com/',
            instagram: 'https://instagram.com/',
            telegram: 'https://t.me/',
            whatsapp: 'https://api.whatsapp.com/send?phone='
          }
        },
        { id: 3,
          photo: '/assets/img/content-item-img.jpg',
          name: 'Сергей',
          city: 'Благевещенск',
          socials: {
            vk: 'https://vk.com/',
            instagram: 'https://instagram.com/',
            telegram: 'https://t.me/',
            whatsapp: 'https://api.whatsapp.com/send?phone='
          }
        },
        { id: 4,
          photo: '/assets/img/content-item-img.jpg',
          name: 'Сергей',
          city: 'Благевещенск',
          socials: {
            vk: 'https://vk.com/',
            instagram: 'https://instagram.com/',
            telegram: 'https://t.me/',
            whatsapp: 'https://api.whatsapp.com/send?phone='
          }
        },
        { id: 5,
          photo: '/assets/img/content-item-img.jpg',
          name: 'Сергей',
          city: 'Благевещенск',
          socials: {
            vk: 'https://vk.com/',
            instagram: 'https://instagram.com/',
            telegram: 'https://t.me/',
            whatsapp: 'https://api.whatsapp.com/send?phone='
          }
        },
        { id: 6,
          photo: '/assets/img/content-item-img.jpg',
          name: 'Сергей',
          city: 'Благевещенск',
          socials: {
            vk: 'https://vk.com/',
            instagram: 'https://instagram.com/',
            telegram: 'https://t.me/',
            whatsapp: 'https://api.whatsapp.com/send?phone='
          }
        },
        { id: 7,
          photo: '/assets/img/content-item-img.jpg',
          name: 'Сергей',
          city: 'Благевещенск',
          socials: {
            vk: 'https://vk.com/',
            instagram: 'https://instagram.com/',
            telegram: 'https://t.me/',
            whatsapp: 'https://api.whatsapp.com/send?phone='
          }
        }
      ]
    }
  },
  components: {
    PartnerItem
  },
  methods: {
    removeItem(id) {
      this.partnerItems = this.partnerItems.filter(item => item.id != id)
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
.partners-wrap
  display: flex
  flex-wrap: wrap
.partner-item
  margin: 2em
  margin-left: 0
@media (max-width: 767px)
  .partner-item
    width: 30%
    margin: 1.5em 1.5%
    margin-left: 1.5%
@media (max-width: 350px) 
  .partner-item
    width: 40%
    margin-right: 5%
    margin-left: 5% 
</style>
