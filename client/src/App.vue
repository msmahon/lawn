<template>
  <div id="app">
    <div id="container">
      <div id="tile-modifiers" class="menu bgcolor-grey-100">
        <Radio :options="conditionOptions" :current-selection="currentSelection" attribute="condition" />
        <Radio :options="healthOptions" :current-selection="currentSelection" attribute="health" />
      </div>

      <Lawn id="lawn" :selections="selections" :current-selection="currentSelection" />

      <div class="menu bgcolor-grey-100" />
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
      conditionOptions: ['weeds', 'clover'],
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
