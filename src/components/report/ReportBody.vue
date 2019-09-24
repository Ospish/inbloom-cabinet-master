<template>
  <div class="report-body">
    <div class="report-box">
      <h2>Доход: <span>{{ income }} р.</span></h2>
      <LineChart v-if="data" :data="data"/>
    </div>
    <div class="report-box">
      <Benchmarks :dataName="this.dataName" />
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
import { mapGetters } from 'vuex'

export default {
  name: 'Report',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'userStats']),
    income(){
      if (this.userStats[this.dataName] == undefined) return 0
      else return this.userStats[this.dataName].sum
    }
  },

  methods: {
    updateIncome(){
      /*
      this.income = this.data.series[0].data.reduce(function(sum, current){
        return sum + current
      }, 0)*/
    }
  },
  mounted() {
    this.updateIncome()
  },
  props: ['data', 'dataName'],
  components: {
    LineChart,
    Benchmarks,
    Leftovers
  }
}
</script>
