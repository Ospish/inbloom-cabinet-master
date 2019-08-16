<template>
  <div class="report-body">
    <div class="report-box">
      <h2>Доход: <span>{{ income }} р.</span></h2>
      <LineChart v-if="data" :data="data"/>
    </div>
    <div class="report-box">
      <Benchmarks />
    </div>
    <div class="report-box">
      <Leftovers />
    </div>
  </div>
</template>

<script>

import LineChart from '@/components/report/LineChart.vue'
import Benchmarks from '@/components/report/Benchmarks.vue'
import Leftovers from '@/components/report/Leftovers.vue'

export default {
  name: 'Report',
  data() {
    return {
      income: ''
    }
  },
  methods: {
    updateIncome(){
      this.income = this.data.series[0].data.reduce(function(sum, current){
        return sum + current
      }, 0)
    }
  },
  updated() {
    this.updateIncome()
  },
  props: ['data'],
  components: {
    LineChart,
    Benchmarks,
    Leftovers
  }
}
</script>
