<template>
  <div id="app">
    <div id="container">
      <div id="tile-modifiers" class="menu bgcolor-grey-100">
        <div class="menu-title color-grey-700">
          Tile Modifiers
        </div>
        <div class="options-title color-grey-700">
          Conditions
        </div>
        <Radio :options="conditionOptions" :current-selection="currentSelection" attribute="condition" />
        <div class="options-title color-grey-800">
          Health
        </div>
        <Radio :options="healthOptions" :current-selection="currentSelection" attribute="health" />
      </div>

      <Lawn :selections="selections" :current-selection="currentSelection" />

      <div id="lawn-data" class="menu bgcolor-grey-100">
        <div class="menu-title color-grey-700">
          Lawn Data
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from './EventBus'
import Lawn from './components/Lawn.vue'
import Radio from './components/Radio.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {Lawn, Radio},
  data() {
    return {
      selections: {
        health: 'good',
        condition: 'weeds'
      },
      currentSelection: 'health',
      conditionOptions: ['weeds', 'clover', 'ants'],
      healthOptions: ['good', 'fair', 'dead']
    }
  },
  created() {
    EventBus.$on('attributeUpdate', (payload) => {
      console.log(this.selections)
      this.currentSelection = payload[0]
      this.selections[payload[0]] = payload[1]
    })
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
}

.menu {
  min-width: 200px;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3);
  height: auto;
}

.menu-title {
  /* font-size: 1.75em; */
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1px solid hsl(150, 8%, 70%);
  margin: 0 -20px;
  padding-bottom: 20px;
  letter-spacing: 2px;
}

.options-title {
  margin: 20px 0 5px;
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
