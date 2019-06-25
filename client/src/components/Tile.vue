<template>
	<div class="tile" :class="classes"></div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'tile',
	props: {tileData: Object},
	data: function() {
		return {
			id: '',
			condition: ''
		}
	},
	computed: {
		classes() {
			return `tile-${this.tileData.cond}`
		}
	},
	methods: {
		
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
