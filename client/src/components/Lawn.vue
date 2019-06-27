<template>
	<div>
		<select @change="lawnSelected">
			<option v-for="lawn in lawns" :value="lawn.name" :key="lawn.name" v-text="lawn.name"></option>
		</select>
		<div v-bind:style="gridStyle">
			<Tile v-for="tile in tiles" :key="tile.id" :tileData="tile" :selections="selections"></Tile>
		</div>
	</div>
</template>

<script>
import Tile from './Tile.vue'
import axios from 'axios'

export default {
	name: 'lawn',
	components: { Tile },
	props: {
		selections: Object
	},
	data: function() {
		return {
			lawns: [],
			selectedLawn: '',
			tiles: [],
			metaData: {},
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
