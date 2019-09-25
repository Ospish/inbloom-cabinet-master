<template>
  <div class="requestions-container">
    <div class="report-head">
      <div class="report-buttons">
        <button class="report-btn" v-for="tab in tabs" :key="tab.name" :class="[currentTab.name, { active: currentTab.name === tab.name}]" @click="currentTab = tab">{{ tab.name }}</button>
<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <button class="report-btn" v-if="isAdmin" v-for="tab in tabs2" :key="tab.name" :class="[currentTab2.name, { active: currentTab2.name === tab.name}]" @click="currentTab2 = tab">{{ tab.name }}</button>
      </div>

    </div>
    <RequestItem v-if="showRequest(request)" v-for="request in orderedRequests" :key="request.id" :itemData="request" @remove="deleteRequest"/>
    <div v-if="currentTab.dataName == 0 && requestInfo.length == 0">Нет активных заявок.</div>
  </div>
</template>

<script>

import RequestItem from '@/components/RequestBox.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Requestions',
  data() {
    return {
      title: 'Заявки',
      itemCount: 0,
      tabs: [
        {
          name: 'Каталог',
          dataName: '0',
          data: null,
        },
        {
          name: 'Квиз',
          dataName: '1',
          data: null,
        },
        {
          name: 'Внутренние',
          dataName: '2',
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
    }
  },
  components: {
    RequestItem
  },
  methods: {
    ...mapActions(['deleteRequest']),
    /*
    removeRequest (id) {
      this.requestions = this.requestions.filter(item => item.id !== id)
    },
     */
    addTitle (title) {
      this.$emit('showTitle', this.title)
    },
    showRequest(request) {
      if (this.currentTab2.dataName == 0) {
        if (this.currentTab.dataName == request.type && request.userid == this.userId && (request.status == 'request_added' || request.status == 'request_sent')) return true
        else return false
      }
      else {
        if (this.currentTab.dataName == request.type && (request.status == 'request_added' || request.status == 'request_sent')) return true
        else return false
      }
    }
  },
  computed: {
    ...mapGetters(['requestInfo', 'userId', 'isAdmin']),
    orderedRequests: function () {
      return _.orderBy(this.requestInfo, 'id', 'desc')
    }
  },
  mounted () {
    this.addTitle(this.title)
    this.currentTab = this.tabs[0]
    this.currentTab2 = this.tabs2[0]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.requestions-container
  display: flex
  flex-wrap: wrap
.report-btn
  width: 10em
.requestion-wrap
  margin: .8em
  &.opened
    width: 100%
    display: flex
    .requestion-box:first-child
      margin-right: 1.6em

@media (max-width: 1600px)
  .requestion-box
    &.opened
      width: 55em
    &__col
      min-width: 25%

@media (max-width: 1024px)
  .requestions-container
    padding: 0 2.5em
    justify-content: space-between
  .requestion-wrap.opened
    flex-wrap: wrap
		.requestion-box:first-child
			margin-bottom: 1.5em
			margin-right: 0
  .requestion-box.opened
    width: 100%
@media (max-width: 767px)
  .report-buttons
    width: 100%
  .report-btn
    width: 33%
  .requestions-container
    padding: 0
  .requestion-wrap
    margin: 0
    margin-bottom: 1.5em
  .requestion-box
    padding: 1.5em
  .remove-requestion
    width: 100%
    textarea
      width: 100%
  .requestion-wrap.opened .requestion-box:first-child
    width: 22em
@media (max-width: 364px)
  .requestions-container
    justify-content: center
</style>
