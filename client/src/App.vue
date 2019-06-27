<template>
	<div id="app">
		<div id="condition-buttons">
			<label for="condition">healthy</label>
			<input type="radio" name="condition" value="healthy" v-model="selectedCondition" id="healthy_button">

			<label for="condition">weeds</label>
			<input type="radio" name="condition" value="weeds" v-model="selectedCondition" id="healthy_button">

			<label for="condition">dead</label>
			<input type="radio" name="condition" value="dead" v-model="selectedCondition" id="healthy_button">

			<label for="condition">clover</label>
			<input type="radio" name="condition" value="clover" v-model="selectedCondition" id="healthy_button">
		</div>
		<Lawn :selectedCondition="selectedCondition"></Lawn>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Lawn from './components/Lawn.vue'
import axios from 'axios'

export default {
	name: 'app',
	components: {Lawn},
	data() {
		return {
			selectedCondition: 'healthy'
		}
	},
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

#condition-buttons {

}
</style>
