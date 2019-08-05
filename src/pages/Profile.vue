<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-avatar">
        <div class="profile-avatar_container">
          <img src="/img/profile-avatar.jpeg" alt="">
          <span class="profile-avatar__value">10 890</span>
        </div>
      </div>
      <p class="profile-name">Сергей Фобэско</p>
      <p class="profile-city">г. Сочи</p>
    </div>
    <ProfileBox />
  </div>
</template>

<script>

import ProfileBox from '@/components/profile/ProfileBox.vue'

export default {
  name: 'Profile',
  components: {
    ProfileBox
  },
  data() {
    return {
      title: 'Профиль'
    }
  },
  methods: {
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
<style scoped lang="sass">
  .profile-container 
    display: flex
    align-items: flex-start
  .profile-card
    margin-right: 2em
  @media (max-width: 767px)
    .profile-container
      flex-direction: column
      align-items: center
    .profile-card
      margin-right: 0
      margin-bottom: 2em
    .profile-box
      width: 100% 
</style>
