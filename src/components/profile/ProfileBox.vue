<template>
  <div class="profile-box personal-data">
    <div class="profile-box__header">
      <h3 class="profile-box__title">{{ currentTab.name }}</h3>
      <div class="profile-menu">
        <button class="btn-default gray" v-for="tab in tabs" :key="tab.name" :class="{active: currentTab.name === tab.name}" @click="currentTab = tab">{{ tab.name }}</button>
      </div>
    </div>
    <component :tabname="tabname" :is="currentTab.component" class="tab"></component>
  </div>
</template>

<script>

import Password from '@/components/profile/Password.vue'
import PersonalData from '@/components/profile/PersonalData.vue'
import Photo from '@/components/profile/Photo.vue'
import Social from '@/components/profile/Social.vue'

var tabs = [
  {
    name: 'Информация',
    component: PersonalData
  },
  {
    name: 'Фото',
    component: Photo
  },
  {
    name: 'Пароль',
    component: Password
  },
  {
    name: 'Соцсети',
    component: Social
  }
]

export default {
  name: 'ProfileBox',
  props: ['tabname'],
  data() {
    return {
      tabs: tabs,
      currentTab: tabs[0]
    }
  },
  mounted(){
    //console.log(this.$route)
    if (this.tabname == 'password') {
      this.currentTab = tabs[2]
    }
  }
}
</script>
