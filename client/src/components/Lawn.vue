<template>
	<div>
		<select @change="lawnSelected">
			<option v-for="lawn in lawns" :value="lawn.name" :key="lawn.name" v-text="lawn.name"></option>
		</select>
		<div v-bind:style="gridStyle">
			<Tile v-for="tile in tiles" :key="tile.id"></Tile>
		</div>
	</div>
</template>

<script>
import Tile from './Tile.vue'
import axios from 'axios'

export default {
	name: 'lawn',
	components: { Tile },
	data: function() {
		return {
			lawns: [],
			selectedLawn: '',
			tiles: [
				{cond: "healthy", id: 1},
				{cond: "healthy", id: 2},
				{cond: "healthy", id: 3},
				{cond: "healthy", id: 4},
				{cond: "healthy", id: 5},
				{cond: "healthy", id: 6},
				{cond: "healthy", id: 7},
				{cond: "healthy", id: 8},
				{cond: "healthy", id: 9},
				{cond: "healthy", id: 10},
				{cond: "healthy", id: 11},
				{cond: "healthy", id: 12},
				{cond: "healthy", id: 13},
				{cond: "healthy", id: 14},
				{cond: "healthy", id: 15},
				{cond: "healthy", id: 16},
				{cond: "healthy", id: 17},
				{cond: "healthy", id: 18},
				{cond: "healthy", id: 19},
				{cond: "healthy", id: 20},
				{cond: "healthy", id: 21},
				{cond: "healthy", id: 22},
				{cond: "healthy", id: 23},
				{cond: "healthy", id: 24},
				{cond: "healthy", id: 25},
				{cond: "healthy", id: 26},
				{cond: "healthy", id: 27},
				{cond: "healthy", id: 28},
				{cond: "healthy", id: 29},
				{cond: "healthy", id: 30},
				{cond: "healthy", id: 31},
				{cond: "healthy", id: 32}
			],
			metaData: {
				columns: 8
			},
		}
	},
	methods: {
		async fetchData(lawnName) {
			let results = await axios.get(`/api/lawn/${lawnName}`);
			this.tiles = results.data.data
			this.metaData = results.data.metaData
		},
		lawnSelected(event) {
			let lawnName = event.target.value
			this.fetchData(lawnName)
		}
	},
	computed: {
		gridStyle() {
			let rows = this.tiles.length / this.metaData.columns
			return {
				display: 'grid',
				backgroundColor: 'white',
				gridTemplateRows: `repeat(${rows},1fr)`,
				gridTemplateColumns: `repeat(${this.metaData.columns},1fr)`,
			}
		}
	},
	mounted() {
		axios.get('/api/getLawns').then(({data}) => {
			this.lawns = data
			if (this.lawns.length > 0) {
				this.fetchData(this.lawns[0].name)
			}
		})
	}
}
</script>

<style>
</style>
