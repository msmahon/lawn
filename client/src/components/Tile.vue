<template>
	<div class="tile" :class="classes" @click="updateTile">
		<div v-for="condition in tileData.conditions" :key="condition" v-text="condition" :class="classes"></div>
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
			let classes = this.tileData.conditions.map(condition => `condition-${condition}`)
			classes.push(`health-${this.tileData.health}`)
			return classes
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
	background-image: url('../assets/grass/health_good.png');
}

.health-fair {
	background-image: url('../assets/grass/health_fair.png');
}

.health-dead {
	background-image: url('../assets/grass/health_dead.png');
}

.condition-weeds {
	color: rgb(199, 95, 168)
}

.condition-clover {
	color: rgb(51, 165, 154)
}
</style>
