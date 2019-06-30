<template>
	<div>
		<select @change="lawnSelected" v-model="selectedLawn">
			<option v-for="lawn in lawns" :value="lawn.name" :key="lawn.name" v-text="lawn.name"></option>
		</select>
		<button @click="resetDatabase">Reset Database</button>
		<button @click="saveChanges">Save Changes</button>
		<div id="lawn">
			<div v-bind:style="gridStyle">
				<Tile v-for="tile in tiles" :key="tile.id" :tileData="tile" :selections="selections"></Tile>
			</div>
		</div>
	</div>
</template>

<script>
import Tile from './Tile.vue'
import util from '../utilities'

export default {
	name: 'lawn',
	components: { Tile },
	props: {
		selections: Object
	},
	data: function() {
		return {
			lawns: [],
			tiles: [],
			metaData: {},
			selectedLawn: ''
		}
	},
	methods: {
		async lawnSelected() {
			let results = await util.fetchLawnData(this.selectedLawn)
			if (results) {
				this.tiles = []
				this.metaData = {}
			}
			this.tiles = results.data.data
			this.metaData = results.data.metaData
		},
		resetDatabase() {
			util.resetDatabase()
		},
		async saveChanges() {
			let data = {
				"data": this.tiles,
				"metaData": this.metaData
			}
			let response = await util.saveLawn(data, this.selectedLawn)
			console.log(response)
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
	async mounted() {
		this.lawns = await util.getLawns()
		if (this.lawns.length > 0) {
			this.selectedLawn = this.lawns[0].name
			this.lawnSelected()
		}
	}
}
</script>

<style>
	#lawn {
		padding: 24px;
	}
</style>
