<template>
	<div class="tile" :class="healthClass" @click="updateTile">
		<div v-for="condition in tileData.conditions" :key="condition" class="condition" :class="condition"></div>
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
		healthClass() { return `health-${this.tileData.health}` }
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
	border: 1px solid rgb(21, 82, 9);
	cursor: pointer;
}

.health-good {
	background-color: rgb(29, 112, 12);
}

.health-fair {
	background-color: rgb(148, 221, 130);
}

.health-dead {
	background-color: rgb(224, 240, 135);
}

.condition {
	width: 32px;
	height: 32px;
	float: left;
	font-size: 1.5em;
}

.weeds::after {
	content: '🌱';
}

.clover::after {
	content: '🍀';
}
</style>
