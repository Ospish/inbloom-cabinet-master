<template>
    <section class="benchmarks">
        <h2>Показатели</h2>
        <progress-bar size="large" val="60" text-align="left" text="Количество чеков"></progress-bar>
        <progress-bar size="large" val="60" text-align="right" text="Средний чек"></progress-bar>
        <progress-bar size="large" val="60" text-align="left" text="Процент отказов"></progress-bar>
    </section>
</template>
<script>

import ProgressBar from 'vue-simple-progress'

export default {
  components: {
    ProgressBar
  },
  data() {
    return {
      
    };
  },
  methods: {
    getData(){
    }
  },
  mounted(){
  }
};
</script>

<style lang="sass">
    .vue-simple-progress-text
        text-align: left!important
</style>
