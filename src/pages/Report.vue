<template>
  <div>
    Это компонент со сводкой
  </div>
</template>

<script>

export default {
  name: 'Report',
  data() {
    return {
      title: 'Сводка',
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
<style lang="sass">
.report-container
  display: flex
  flex-wrap: wrap
</style>
