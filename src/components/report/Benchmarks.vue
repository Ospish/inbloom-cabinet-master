<template>
    <section class="benchmarks">
        <h2>Показатели</h2>
        <progress-bar class="branchmarks-item checkCount" size="large" :val="checkCount / 15 * 100" :bar-color="barColor" :text="checkCount + ' шт.'"></progress-bar>
        <progress-bar class="branchmarks-item averageVal" size="large" :val="averageVal" max="3500" :bar-color="barColor" :text="averageVal + ' р.'"></progress-bar>
        <progress-bar class="branchmarks-item failureRate" size="large" :val="failureRate" :bar-color="barColor" :text="failureRate + '%'"></progress-bar>
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
        checkCount: 10,
        averageVal: 2500,
        failureRate: 20,
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
