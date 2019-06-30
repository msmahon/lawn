<template>
	<div id="app">
		<div id="condition-buttons">
			<label for="condition">weeds</label>
			<input type="radio" name="condition" value="weeds" v-model="selectedCondition" @click="currentSelection = 'condition'">

			<label for="condition">clover</label>
			<input type="radio" name="condition" value="clover" v-model="selectedCondition" @click="currentSelection = 'condition'">
		</div>
		<div id="health-buttons">
			<label for="health">Good</label>
			<input type="radio" name="health" value="good" v-model="selectedHealth" @click="currentSelection = 'health'">

			<label for="health">Fair</label>
			<input type="radio" name="health" value="fair" v-model="selectedHealth" @click="currentSelection = 'health'">

			<label for="health">Dead</label>
			<input type="radio" name="health" value="dead" v-model="selectedHealth" @click="currentSelection = 'health'">
		</div>
		<Lawn :selections="selections"></Lawn>
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
			selectedHealth: 'good',
			selectedCondition: 'healthy',
			currentSelection: 'health'
		}
	},
	computed: {
		selections() {
			return {
				health: this.selectedHealth,
				condition: this.selectedCondition,
				currentSelection: this.currentSelection
			}
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
