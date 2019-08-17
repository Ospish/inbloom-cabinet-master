<template>
  <form class="personal-data__form" action="">
    <div class="social-table">
      <div class="social-table_row">
        <p>Отображать:</p>
      </div>
      <SocialBox v-for="socialItem in socialData" :key="socialItem.id" :socialData="socialItem" />
    </div>
    <div class="profile_save-changes">
      <button class="btn-default big gray">Отмена</button>
      <button type="submit" class="btn-default big purple-orange">Сохранить соцсети</button>
    </div> 
  </form>
</template>

<script>

import SocialBox from '@/components/profile/SocialBox.vue'

export default {
  name: 'Social',
  data() {
    return {
      socialData: [
        {title: 'Вконтакте', href: 'https://vk.com/'},
        {title: 'Инстаграм', href: 'https://instagram.com/'},
        {title: 'Твиттер', href: 'https://twitter.com/'},
        {title: 'Вконтакте', href: 'https://vk.com/'},
        {title: 'Вконтакте', href: 'https://vk.com/'},
        {title: 'Вконтакте', href: 'https://vk.com/'}
      ]
    }
  },
  components: {
    SocialBox
  }
}
</script>

