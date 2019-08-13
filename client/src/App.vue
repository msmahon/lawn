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
	justify-content: center;
}

.menu {
	padding: 20px;
	border-radius: 4px;
	box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3);
	width: 300px;
}

.option-set {
	background-color: rgb(255,255,255);
	border-radius: 4px;
	border: 1px solid hsl(150,8%, 80%);
	width: 100%;
	margin: 10px 0 10px 0;
}

.menu .option {
	width: 100%;
	padding: 4px;
	border-bottom: 1px solid hsl(150, 8%, 80%);
	width: auto;
}

.menu .option:last-child {
	border: none;
}
</style>
