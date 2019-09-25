<template>
    <section class="leftovers">
        <h2>Складские остатки:</h2>
        <div class="leftovers-table">
            <div class="table-head">
                <p>Наименование:</p>
                <p>Количество:</p>
            </div>
            <div class="table-body">
                <div class="table-row" v-for="(item, index) in stockInfo" v-if="stockInfo[index][userId] > 0" :key="item.id">
                    <p>{{ stockInfo[index].name }}</p>
                    <p>{{ stockInfo[index][userId] }} шт</p>
                </div>
            </div>
        </div>
        <button @click="getToShop" class="btn-default purple-orange big">Закупить товар</button>
    </section>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['shopInfo', 'stockInfo', 'userId']),
  },
  data() {
    return {
    };
  },
  methods: {
      getToShop() {
          this.$router.push('/home/shop')
      },
  },
  mounted(){
  }
};
</script>

<style lang="sass">

.leftovers-table
    margin-bottom: 2em
    .table-head, .table-row
        display: flex
        justify-content: space-between
        margin-bottom: .7em
        p
            width: 35%
            &:first-child
                width: 60%
    .table-head
        margin-bottom: 1.4em
        font-weight: 700

</style>
