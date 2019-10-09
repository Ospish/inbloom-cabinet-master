<template>
  <div class="right-section__header">
    <div class="right-section__header-menu">
      <router-link to="/home/basket" name="Корзина" class="header-basket">
        <span class="header-basket__label">{{ basketCount }}</span>
      </router-link>
      <p class="header-profile">
        <router-link to="/home/profile">
        <img :src="userInfo.photo || noPhoto" alt="">
        </router-link>
        <ul class="profile-popup">
          <li @click="exitProfile">Выйти</li>
        </ul>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Header",
  props: ['openClass'],
  computed: {
    ...mapGetters(['basketCount', 'userInfo', 'noPhoto', 'isLoaded'])
  },
  watch: {
    isLoaded(){
      this.$forceUpdate();
    }
  },
  methods: {
    exitProfile() {
      this.$store.dispatch('logOut');
      this.$router.push('/auth')
    }
  }
}
</script>
