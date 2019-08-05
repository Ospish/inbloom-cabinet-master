<template>
  <div class="home">
    <div class="content-wrap">
      <Sidebar :openClass="menuOpened" @toggleMenu="toggleMenu"/>
      <section class="right-section">
        <Header :openClass="menuOpened" @toggleMenu="toggleMenu"/>
        <div class="breadcrumbs">
          <a>Домашняя</a>
          <a class="active">Пользователь</a>
        </div>
        <div class="right-section_content">
          <h2 class="right-section__title">{{ title }}</h2>
          <Profile v-if="$route.params.id === 'profile' || $route.params.id === undefined" @showTitle="showTitle" />
          <Stock v-if="$route.params.id === 'stock'" @showTitle="showTitle"/>
          <Report v-if="$route.params.id === 'report'" @showTitle="showTitle"/>
          <Requestions v-if="$route.params.id === 'requestions'" @showTitle="showTitle"/>
          <Shop v-if="$route.params.id === 'shop'" @showTitle="showTitle"/>
          <Content v-if="$route.params.id === 'content'" @showTitle="showTitle"/>
          <Partners v-if="$route.params.id === 'partners'" @showTitle="showTitle"/>
        </div>
        <footer>
          <span class="">&copy; 2019 InBloom.</span>
          <a
            class="fobesko-team"
            href="http://fobesko.com/"
            target="_blank"
          >Fobesko Team</a>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/components/Header.vue'
import Profile from '@/pages/Profile.vue'
import Stock from '@/pages/Stock.vue'
import Report from '@/pages/Report.vue'
import Requestions from '@/pages/Requestions.vue'
import Shop from '@/pages/Shop.vue'
import Content from '@/pages/Content.vue'
import Partners from '@/pages/Partners.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
    Header,
    Profile,
    Stock,
    Report,
    Requestions,
    Shop,
    Content,
    Partners
  },
  data() {
    return {
      title: '',
      menuOpened: false
    }
  },
  methods: {
    showTitle(title) {
      this.title = title
    },
    toggleMenu(isOpen) {
      this.menuOpened = !isOpen
    }
  }
}
</script>
