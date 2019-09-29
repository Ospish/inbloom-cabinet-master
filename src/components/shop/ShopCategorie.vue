<template>
	<div class="report-btn" :class="[{ active: currentTab.name === tab.name}]" >
		<input class="report-btn__inner" @click="selectSubcategory(tab)" :value="tab.name" readonly>
		<div class="remove-cat-popup" v-if="showModal">
			<p>Вы действительно хотите удалить данную категорию?</p>
			<div class="remove-cat-popup__btns">
				<button class="btn-yes" @click="deleteSubcategory(tab); showModal=false">Да</button><button class="btn-no" @click="showModal=false">Нет</button>
			</div>
		</div>
		<div v-if="isAdmin" class="report-btn__options">
			<button class="report-btn__changed" v-if="changeToggler" @click="saveSubcategory($event, tab)"></button>
			<button v-if="currentTab.name === tab.name && !changeToggler" class="report-btn__change" @click="changeSubcategory($event, tab)"></button>
			<button v-if="currentTab.name === tab.name" class="report-btn__remove" @click="showModal = true"></button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data(){
		return {
			changeToggler: false,
			showModal: false
		}
	},
  computed: mapGetters(['isAdmin']),
	props: ['tab', 'currentTab', 'type'],
	methods: {
		selectSubcategory(tab){
			if (document.width < 600) this.accordeonHeight['subcategories'] = '0px'
			this.$emit('selectSubcategory', this.tab)
    },
    deleteSubcategory(tab){
			this.$emit('deleteSubcategory', this.tab)
    },
    changeSubcategory($event, tab){
			this.$emit('changeSubcategory', this.tab)
			this.changeToggler = true
      $event.path[2].firstChild.removeAttribute('readonly')
      $event.path[2].firstChild.focus()
    },
    saveSubcategory($event, tab){
			$event.path[2].firstChild.setAttribute('readonly', 'readonly')
			this.tab.name = $event.path[2].firstChild.value
			this.changeToggler = false
      if (this.type == 0) {
        this.$store.dispatch('editCategory', tab)
        console.log("editCategory")
      }
      if (this.type == 1) {
        this.$store.dispatch('editSubCategory', tab)
        console.log("editSubCategory")
      }
    }
	}
}
</script>

<style lang="sass" scoped>
.subcategories .report-btn.active
	background-color: #d43eff
	background-image: none
.remove-cat-popup
	position: fixed
	width: 20em
	max-width: 95%
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
	background-color: #fff
	border-radius: 5px
	padding: 2em
	z-index: 10
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)
	&__btns
		width: fit-content
		margin-left: auto
	p
		color: #555555
		margin-bottom: 1em

.report-btn
	position: relative
	margin-bottom: 1em
	margin: .25em
	width: calc(25% - .5em)
	border-radius: 1em;
	&__change, &__remove, &__changed
		width: 1em
		height: 1em
		background-position: center
		background-size: 100%
		background-repeat: no-repeat
	&__change
		background-image: url('../../assets/img/icons/edit-b.svg')
	&__remove
		background-image: url('../../assets/img/icons/trash_black.svg')
	&__changed
		background-image: url('../../assets/img/icons/draw-check-mark-b.svg')
	&.active
		button, input
			color: #fff
		.report-btn__change
			background-image: url('../../assets/img/icons/edit-w.svg')
		.report-btn__remove
			background-image: url('../../assets/img/icons/trash_white.svg')
		.report-btn__changed
			background-image: url('../../assets/img/icons/draw-check-mark.svg')
	&__options
		position: absolute
		right: 0
		top: 50%
		transform: translateY(-50%)
		button
			background-color: transparent
			margin: 0 .5em
	&__inner
		width: 100%
		height: 100%
		background-color: transparent
		padding: .5em 0
		border: none
		text-align: center
		&[readonly]
			cursor: pointer
	&:last-child
		margin-right: auto
@media (max-width: 767px)
	.report-btn__inner
		padding: .8em 0
@media (max-width: 767px)
  .report-btn
		height: 3em
		width: calc(50% - .5em)!important


</style>
