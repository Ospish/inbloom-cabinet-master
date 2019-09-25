<template>
  <section class="left-sidebar" :class="{ opened: openClass }">
    <div class="left-sidebar__logo">
      <img
        src="/img/logo.png"
        alt=""
      >
    </div>
    <ul class="left-sidebar__navigation">
      <li @click="toggleMenu" v-for="item in links" :key="item.id"><router-link :to="item.link">{{ item.name }}</router-link></li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "Sidebar",
  props: ['openClass'],
  data() {
    return {
      links: [
        {name: "Сводка", link: "/home/report"},
        {name: "Профиль", link: "/home/profile"},
        {name: "Заявки", link: "/home/requestions"},
        {name: "Склад", link: "/home/stock"},
        {name: "Магазин", link: "/home/shop"},
        {name: "Контент", link: "/home/content"},
        {name: "Партнеры", link: "/home/partners"},
        {name: "Корзина", link: "/home/basket"},
        {name: "История", link: "/home/history"},
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.$emit('toggleMenu', this.openClass)
    }
  }
}
</script>
