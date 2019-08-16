<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapActions(['checkAuth']),
    routing() {
      if (this.isLoginned === true && this.$route.params.id === undefined) this.$router.push('/home/');
      else if (this.isLoginned === true && this.$route.params.id != undefined) this.$router.push('/home/' + this.$route.params.id);
      else this.$router.push('/auth')
    }
  },
  computed: mapGetters(['isLoginned']),
  mounted() {
    this.checkAuth();
    this.routing();
  }
}

</script>

<style lang="scss">

</style>
