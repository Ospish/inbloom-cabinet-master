<template>
  <div class="report-container">
    <div class="report-head">
      <div class="report-buttons">
        <button class="report-btn active">Сегодня</button>
        <button class="report-btn">Месяц</button>
        <button class="report-btn">Год</button>
      </div>
    </div>
    <div class="report-box">
      <h2>Доход: <span>{{ income }} р.</span></h2>
      <LineChart @getData="getData"/>
    </div>
    <div class="report-box">
      <Benchmarks />
    </div>
  </div>
</template>

<script>

import LineChart from '@/components/report/LineChart.vue'
import Benchmarks from '@/components/report/Benchmarks.vue'

export default {
  name: 'Report',
  data() {
    return {
      title: 'Сводка',
      lineChartData: {},
      income: ''
    }
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', this.title)
    },
    getData(data){
      this.lineChartData = data
      this.income = this.lineChartData.series[0].data.reduce(function(sum, current){
        return sum + current
      }, 0)
    }
  },
  mounted() {
    console.log(this.lineChartData)
    this.addTitle(this.title)
  },
  components: {
    LineChart,
    Benchmarks
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.report-container
  display: flex
  flex-wrap: wrap
  width: 100%

.highcharts-button.highcharts-contextbutton
  display: none!important

.highcharts-credits
  display: none!important
</style>
