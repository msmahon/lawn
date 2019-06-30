<template>
	<div class="tile" :class="classes" @click="updateTile">
		<div v-text="tileData.health"></div>
		<div v-for="condition in tileData.conditions" :key="condition" v-text="condition" :class="condition"></div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'tile',
	props: {
		tileData: Object,
		selections: Object
	},
	data: function() {
		return {}
	},
	computed: {
		classes() {
			return this.tileData.conditions.map(condition => `tile-${condition}`)
		}
	},
	methods: {
		updateTile() {
			if ('health' === this.selections.currentSelection) this.healthUpdate()
			if ('condition' === this.selections.currentSelection) this.conditionUpdate()
		},
		conditionUpdate() {
			if (this.tileData.conditions.includes(this.selections.condition)) {
				this.tileData.conditions = this.tileData.conditions.filter(c => c != this.selections.condition)
			} else {
				this.tileData.conditions.push(this.selections.condition)
			}
		},
		healthUpdate() {
			this.tileData.health = this.selections.health
		}
	},
	mounted() {
	}
}
</script>

<style>
.tile {
	width: 64px;
	height: 64px;
	border: 1px solid black;
	cursor: pointer;
}

.health-good {
	color: green
}

.weeds {
	color: rgb(199, 95, 168)
}

.dead {
	color: brown
}

.clover {
	color: rgb(51, 165, 154)
}
</style>
