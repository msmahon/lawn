<template>
	<div class="tile" :class="classes" @click="applyCondition"></div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'tile',
	props: {
		tileData: Object,
		selectedCondition: String
	},
	data: function() {
		return {
			id: '',
			conditions: []
		}
	},
	computed: {
		classes() {
			return this.conditions.map(condition => `tile-${condition}`)
		}
	},
	methods: {
		applyCondition() {
			this.conditions.push(this.selectedCondition)
		}
	},
	mounted() {
		this.conditions = this.tileData.conditions
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

.tile-healthy::after {
	content: 'healthy';
}

.tile-weeds::after {
	content: 'weeds';
}

.tile-dead::after {
	content: 'dead';
}

.tile-clover::after {
	content: 'clover';
}
</style>
