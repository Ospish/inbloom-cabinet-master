<template>
  <div class="history-wrap">
    <div class="report-head">
      <div class="report-buttons">
        <button class="report-btn" v-for="tab in tabs" :key="tab.name" :class="[currentTab.name, { active: currentTab.name === tab.name}]" @click="currentTab = tab">{{ tab.name }}</button>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <button class="report-btn" v-if="isAdmin" v-for="tab in tabs2" :key="tab.name" :class="[currentTab2.name, { active: currentTab2.name === tab.name}]" @click="currentTab2 = tab">{{ tab.name }}</button>
      </div>
    </div>

    <HistoryItem v-if="showRequest(item)" v-for="item in orderedRequests" :key="item.id" :itemData="item" @removeItem=""/>
    <div v-if="orderedRequests.length == 0">В вашей истории еще нет записей.</div>
  </div>
</template>

<script>
import HistoryItem from '@/components/HistoryItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'History',
  computed: {
    ...mapGetters(['isAdmin', 'historyInfo', 'requestInfo', 'userId']),
    orderedRequests: function () {
      return _.orderBy(this.requestInfo, 'id', 'desc')
    }
  },
  data () {
    return {
      tabs: [
        {
          name: 'Закрытые',
          dataName: 'request_closed',
          data: null,
        },
        {
          name: 'Удаленные',
          dataName: 'request_deleted',
          data: null,
        },
      ],
      tabs2: [
        {
          name: 'Свои',
          dataName: '0',
          data: null,
        },
        {
          name: 'Все',
          dataName: '1',
          data: null,
        },
      ],
      currentTab: '',
      currentTab2: '',
      title: 'История'
    }
  },
  components: {
      HistoryItem
  },
  methods: {
    addTitle(title) {
      this.$emit('showTitle', this.title)
    },
    showRequest(request) {
      if (this.currentTab2.dataName == 0) {
        if (this.currentTab.dataName == request.status && request.userid == this.userId && (request.status == 'request_closed' || request.status == 'request_deleted')) return true
        else return false
      }
      else {
        if (this.currentTab.dataName == request.status && (request.status == 'request_closed' || request.status == 'request_deleted')) return true
        else return false
      }
    },
  },

  mounted() {
    this.addTitle(this.title)
    this.currentTab = this.tabs[0]
    this.currentTab2 = this.tabs2[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.partners-wrap
  display: flex
  flex-wrap: wrap
.partner-item
  margin: 2em
  margin-left: 0
@media (max-width: 767px)
  .partner-item
    width: 30%
    margin: 1.5em 1.5%
    margin-left: 1.5%
@media (max-width: 350px)
  .partner-item
    width: 40%
    margin-right: 5%
    margin-left: 5%
</style>
