<template>
	<div class="tile"></div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'tile',
	props: {},
	components: {},
	methods: {
		
	}
}
</script>

<style>
.tile {
	width: 64px;
	height: 64px;
	/* background-color: rgb(212, 96, 96); */
	border: 1px solid #94D794;

	background: repeating-linear-gradient(
		135deg,
		#77A668,
		#77A668 12.5%,
		#94D794 12.5%,
		#94D794 25%
	);
}

.tile-weeds {

}

.tile-dead {

}

.tile-clover {

}
</style>
