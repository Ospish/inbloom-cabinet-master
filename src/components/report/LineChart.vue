<template>
    <section class="charts">
        <vue-highcharts :options="options" :highcharts="Highcharts"></vue-highcharts>
    </section>
</template>
<script>
import VueHighcharts from "vue2-highcharts";
import Exporting from "highcharts/modules/exporting";
import Highcharts from "highcharts";
import { LineChart as data } from "@/assets/data.js";

Exporting(Highcharts);
export default {
  components: {
    VueHighcharts
  },
  data() {
    return {
      options: data,
      Highcharts: Highcharts
    };
  },
  methods: {
    getData(){
      this.$emit('getData', this.options)
      console.log(this.options)
    }
  },
  mounted(){
    this.getData(this.options)
  }
};
</script>
