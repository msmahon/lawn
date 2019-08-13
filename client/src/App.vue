<template>
	<div id="app">
		<div id="container">
			<div id="tile-modifiers" class="menu bgcolor-grey-100">
				<div id="condition-buttons">

					<div class="option-set bgcolor-grey-100">
						<div v-for="option in conditionOptions" :key="option" class="option">
							<label for="condition" v-text="option"></label>
							<input type="radio" name="condition" :value="option" v-model="selectedCondition" @click="currentSelection = 'condition'">
						</div>
					</div>

				</div>
				<div id="health-buttons">

					<div class="option-set bgcolor-grey-100">
						<div v-for="option in healthOptions" :key="option" class="option">
							<label for="health" v-text="option"></label>
							<input type="radio" name="health" :value="option" v-model="selectedHealth" @click="currentSelection = 'condition'">
						</div>
					</div>

				</div>
			</div>
			
			<Lawn :selections="selections" id="lawn"></Lawn>

			<div class="menu bgcolor-grey-100">

			</div>
		</div>
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
			currentSelection: 'health',

			conditionOptions: ['weeds', 'clover'],
			healthOptions: ['good', 'fair', 'dead']
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

#container {
	display: flex;
	flex-direction: column;
}
</style>
