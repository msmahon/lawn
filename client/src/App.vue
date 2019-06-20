<template>
	<div id="app">
		<Lawn></Lawn>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Lawn from './components/Lawn.vue'
import axios from 'axios'

export default {
	name: 'app',
	components: {Lawn},
	methods: {
		test: function() {
			let response = axios.get('/api/');
			response.then(console.log);
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	display: flex;
	justify-content: center;
}
</style>
