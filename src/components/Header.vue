<template>
  <div class="right-section__header">
    <div class="right-section__header-menu">
      <a
        href=""
        name="Корзина"
        class="header-basket"
      >
        <span class="header-basket__label">9</span>
      </a>
      <p class="header-profile">
        <router-link to="/home/profile">
        <img
          src="/img/profile-min.jpeg"
          alt=""
        >
        </router-link>
        <ul class="profile-popup">
          <li @click="exitProfile">Выйти</li>
        </ul>
      </p>
    </div>
    <div class="header-menu-toggler" @click="toggleMenu" :class="{ active: openClass }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ['openClass'],
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu', this.openClass)
    },
    exitProfile() {
      this.$store.dispatch('logOut');
      this.$router.push('/auth')
    }
  }
}
</script>
