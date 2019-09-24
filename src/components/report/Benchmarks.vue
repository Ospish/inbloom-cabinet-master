<template>
    <section class="benchmarks">
        <h2>Показатели</h2>
        <progress-bar class="branchmarks-item checkCount" size="large" :val="count / 15 * 100" :bar-color="barColor" :text="count + ' шт.'"></progress-bar>
        <progress-bar class="branchmarks-item averageVal" size="large" :val="average" :max="getMaxCheck" :bar-color="barColor" :text="average + ' р.'"></progress-bar>
        <progress-bar class="branchmarks-item failureRate" size="large" :val="failureRate" :bar-color="barColor" :text="failureRate + '%'"></progress-bar>
    </section>
</template>
<script>

import ProgressBar from 'vue-simple-progress'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProgressBar
  },
  computed: {
    ...mapGetters(['isAdmin', 'userStats']),
    count(){
      console.log(this.userStats)
      if (this.userStats[this.dataName] == undefined) return 0
      else return this.userStats[this.dataName].count
    },
    average(){
      if (this.userStats[this.dataName] == undefined) return 0
      else return this.userStats[this.dataName].midval.toFixed(2)
    },
    getMaxCheck() {
      if (this.maxCheck < this.average) this.maxCheck = this.average
      return this.maxCheck
    }
  },
  props: ['dataName'],
  data() {
    return {
        maxCheck: 2000,
        averageVal: 2500,
        failureRate: 0,
        barColor: 'linear-gradient(to right, #d43eff 0%, #ed832c 99%, #ed832c 100%)'
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
        text-align: right!important
        position: relative
        margin-top: .8em
        font-size: 1.2em!important
        &:after
            position: absolute
            display: block
            left: 0
            top: 50%
            transform: translateY(-50%)
    .checkCount .vue-simple-progress-text::after
        content: 'Количество чеков'
    .averageVal .vue-simple-progress-text::after
        content: 'Средний чек'
    .failureRate .vue-simple-progress-text::after
        content: 'Процент отказов'

    .vue-simple-progress-bar
        box-shadow: 0 10px 20px rgba(243, 31, 121, 0.3)

</style>
