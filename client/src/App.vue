<template>
  <div id="app">
    <div id="container">
      <div id="tile-modifiers" class="menu bgcolor-grey-100">
        <div class="menu-title color-grey-700">Tile Modifiers</div>

        <div class="option-set-title color-grey-700">Conditions</div>
        <Radio :options="conditionOptions" :current-selection="selections.current" attribute="condition" />

        <div class="option-set-title color-grey-800">Health</div>
        <Radio :options="healthOptions" :current-selection="selections.current" attribute="health" />
      </div>

      <div id="lawn-container" class="menu bgcolor-grey-100">
        <Lawn :selections="selections" :data="selectedLawn" :current-selection="selections.current" />
        <select v-model="selectedLawn.name" @change="lawnSelected">
          <option
            v-for="lawn in lawns"
            :key="lawn.name"
            :value="lawn.name"
            v-text="lawn.name"
          />
        </select>
        <div class="button" @click="resetDatabase">
          Reset Database
        </div>
        <div class="button" @click="saveChanges">
          Save Changes
        </div>
      </div>

      <div id="lawn-data" class="menu bgcolor-grey-100">
        <div class="menu-title color-grey-700">Lawn Data</div>
        <div class="option-set">
          <div class="option option-title"><span colspan="2" v-text="grassData.name" /></div>
          <div v-for="(value, key) in sortedGrassData" :key="key" class="option">
            <div v-text="value.name" class="option-title" /><div v-text="value.content" class="option-value"/>
          </div>
        </div>
      </div>

      <div id="weather" class="menu bgcolor-grey-100" />
    </div>
  </div>
</template>

<script>
import {EventBus} from './EventBus'
import util from './utilities'
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
        condition: 'weeds',
        current: 'health'
      },
      conditionOptions: ['weeds', 'clover', 'ants'],
      healthOptions: ['good', 'fair', 'dead'],
      lawns: [],
      selectedLawn: {
        name: '',
        tiles: null,
        columns: null
      },
      grassData: {}
    }
  },
  computed: {
    sortedGrassData() {
      return [
        { "name": "Color", "content": this.grassData.color },
        { "name": "Season", "content": this.grassData.season },
        { "name": "Blade", "content": this.grassData.blade },
        { "name": "Growth", "content": this.grassData.growth },
        { "name": "Season", "content": this.grassData.season },
        { "name": "Water", "content": this.grassData.water },
        { "name": "Texture", "content": this.grassData.texture },
      ]
    }
  },
  created() {
    EventBus.$on('attributeUpdate', (payload) => {
      this.selections.current = payload[0]
      this.selections[payload[0]] = payload[1]
    })
  },
  async mounted() {
    this.lawns = await util.getLawns()
    if (this.lawns.length > 0) {
      this.selectedLawn.name = this.lawns[0].name
      this.lawnSelected()
    }
  },
  methods: {
    async lawnSelected() {
      let results = await util.fetchLawnData(this.selectedLawn.name)
      results = results.data
      if (results) {
        this.selectedLawn.tiles = JSON.parse(results.lawns.data)
        this.selectedLawn.columns = results.lawns.columns
        this.grassData = results.grass_types
      }
    },
    resetDatabase() {
      util.resetDatabase()
    },
    async saveChanges() {
      let data = {
        "data": this.tiles,
        "columns": this.columns
      }
      let response = await util.saveLawn(data, this.selectedLawn)
      console.log(response)
      // Visually alert user lawn has been saved
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
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

#container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: auto 200px;
  grid-template-areas:
    "l_sidebar main r_sidebar"
    "weather weather weather";
}

#tile-modifiers {
  grid-area: l_sidebar
}

#lawn-container {
  grid-area: main
}

#lawn-data {
  grid-area: r_sidebar
}

#weather {
  grid-area: weather
}

.menu {
  min-width: 200px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
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

.option-set-title {
  margin: 20px 0 5px;
}

.option-set {
  background-color: rgb(255,255,255);
  border-radius: 10px;
  border: 1px solid hsl(150,8%, 80%);
  width: 100%;
  margin: 10px 0 10px 0;
}

.menu .option {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid hsl(150, 8%, 80%);
  width: auto;
}

.option-title {
  font-weight: bold;
}

.option-value {
  margin-left: 20px;
}

.menu .option:last-child {
  border: none;
}


</style>
