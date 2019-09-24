<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-avatar">
        <div class="profile-avatar_container">
          <img :src="userInfo.photo || noPhoto" alt="">
          <span class="profile-avatar__value">{{this.userInfo.points}}</span>
        </div>
      </div>
      <p class="profile-name">{{this.userInfo.name}} {{this.userInfo.surname}}</p>
      <p class="profile-city">{{this.userInfo.city}}</p>
    </div>
    <ProfileBox :tabname="tabname" />
  </div>
</template>

<script>
import ProfileBox from '@/components/profile/ProfileBox.vue'
import { mapActions, mapGetters } from 'vuex'

export default {

  name: 'Profile',
  components: {
    ProfileBox
  },
  data() {
    return {
      title: 'Профиль',
      name: '',
      surname: '',
      city: '',
      points: 0
    }
  },
  props: ['tabname'],
  computed: mapGetters(['userInfo', 'userId', 'noPhoto']),
  methods: {
    ...mapActions(['getCoords']),
    addTitle (title) {
      this.$emit('showTitle', this.title)
    }
  },
  mounted () {
    this.addTitle(this.title)
  },
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
