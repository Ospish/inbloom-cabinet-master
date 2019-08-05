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
      <router-link to="/home/profile"
        class="header-profile"
      >
        <img
          src="/img/profile-min.jpeg"
          alt=""
        >
      </router-link>
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
    }
  }
}
</script>
