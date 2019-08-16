<template>
    <section class="leftovers">
        <h2>Складские остатки:</h2>
        <div class="leftovers-table">
            <div class="table-head">
                <p>Наименование:</p>
                <p>Количество:</p>
            </div>
            <div class="table-body">
                <div class="table-row" v-for="item in leftovers" :key="item.id">
                    <p>{{ item.name }}</p>
                    <p>{{ item.count }} шт</p>
                </div>
            </div>
        </div>
        <button @click="getToShop" class="btn-default purple-orange big">Закупить товар</button>
    </section>
</template>
<script>


export default {
  data() {
    return {
        leftovers: [
            { name: 'Бутон белых роз, 8 мм', count: 12 },
            { name: 'Бутон красных роз, 8 мм', count: 8 },
            { name: 'Бутон белых роз, 8 мм', count: 12 },
            { name: 'Бутон белых роз, 8 мм', count: 12 },
        ]
    };
  },
  methods: {
      getToShop() {
          this.$router.push('/home/shop')
      }
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
