<template>
    <section class="charts">
        <vue-highcharts :options="data" v-if="data.id === 'today' || showChart" ></vue-highcharts>
        <vue-highcharts :options="data" v-if="data.id === 'month' || showChart" ></vue-highcharts>
        <vue-highcharts :options="data" v-if="data.id === 'year' || showChart" ></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import Exporting from "highcharts/modules/exporting";
import Highcharts, { Chart } from "highcharts";

Exporting(Highcharts);
export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      showChart: true,
      Highcharts: Highcharts
    };
  },
  methods: {
  },
  props: ['data'],
  mounted(){
    this.showChart = false
  }
};
</script>
