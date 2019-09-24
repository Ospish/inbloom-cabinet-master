<template>
  <div class="report-container">
    <div class="report-head">
      <div class="report-buttons">
        <button class="report-btn" v-for="tab in tabs" :key="tab.name" :class="[currentTab.name, { active: currentTab.name === tab.name}]" @click="currentTab = tab">{{ tab.name }}</button>
      </div>
    </div>
    <component :is="currentTab.component" :data="currentTab.data" :dataName="currentTab.dataName" class="tab"></component>
  </div>
</template>

<script>

import ReportBody from '@/components/report/ReportBody.vue'
import chartData from '@/assets/data.js'
import { mapGetters, mapActions } from 'vuex'

var tabs = [
  {
    name: 'Сегодня',
    dataName: 'today',
    data: null,
    component: ReportBody
  },
  {
    name: 'Месяц',
    dataName: 'month',
    data: null,
    component: ReportBody
  },
  {
    name: 'Год',
    dataName: 'year',
    data: null,
    component: ReportBody
  }
]

export default {
  name: 'Report',
  data() {
    return {
      title: 'Сводка',
      income: '',
      tabs: tabs,
      chartData: chartData,
      currentTab: ''
    }
  },
  computed: {
    ...mapGetters(['userStats']),
  },
  methods: {
    ...mapActions(['loadStats']),
    addTitle(title) {
      this.$emit('showTitle', this.title)
    }
  },
  created() {
    for (let index = 0; index < this.tabs.length; index++) {
      this.tabs[index].data = this.chartData[this.tabs[index].dataName]
    }
    this.currentTab = tabs[0]
  },
  mounted() {
    this.addTitle(this.title)
    let newStats = this.userStats
    //console.log(newStats)
    this.chartData.today.series[0].data = newStats.day.values
    this.chartData.today.xAxis.categories = newStats.day.time
    this.chartData.month.series[0].data = newStats.month.values
    this.chartData.month.xAxis.categories = newStats.month.days
    this.chartData.year.series[0].data = newStats.year.values
    this.chartData.year.xAxis.categories = newStats.year.months

  },
  components: {
    ReportBody,
    chartData
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.report-container
  width: 100%
.report-body
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  width: 100%
.highcharts-button.highcharts-contextbutton
  display: none!important

.highcharts-credits
  display: none!important
.branchmarks-item
  margin-bottom: 2em
.report-box
  margin-bottom: 2em

@media (max-width: 1023px)
  .report-box
    width: 100%
    padding: 2.8em 3em
    font-size: 1.3em
</style>
