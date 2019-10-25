<template>
  <div id="app">
    <div id="container">
      <div id="tile-modifiers" class="menu">
        <div class="menu-title">Tile Modifiers</div>

        <div class="option-set-title">Conditions</div>
        <Radio :options="conditionOptions" :current-selection="selections.current" attribute="condition" />

        <div class="option-set-title">Health</div>
        <Radio :options="healthOptions" :current-selection="selections.current" attribute="health" />
      </div>

      <div v-if="!noLawns" class="menu">
        <div id="lawn-container">
          <Lawn
            :selections="selections"
            :data="selectedLawn"
            :current-selection="selections.current"
          />
        </div>
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

      <div v-if="noLawns" id="add-lawn-menu" class="menu">
        <h2>Create a new Lawn</h2>
        <div>
          <input id="lawn-name" v-model="newLawn.name" type="text" name="name" placeholder="My Lawn"><br>
          <input id="lawn-width" v-model.number="newLawn.width" type="range" name="width" min="4" max="12"><br>
          <input id="lawn-height" v-model.number="newLawn.height" type="range" name="height" min="4" max="8"><br>
          <input id="lawn-zip" v-model="newLawn.zip" type="text" name="zip" placeholder="ZIP"><br>
          <select id="lawn-grass-type" v-model="newLawn.grass_type_id" name="grassType">
            <option value="null">-SELECT ONE-</option>
            <option
              v-for="(value, key) in grassTypes"
              :key="key"
              :value="value.rowid"
              v-text="value.name"
            />
          </select>
          <div id="lawn-size-preview">
            <div v-for="(widthValue, widthKey) in newLawn.width" :key="widthKey">
              <div v-for="(heightValue, heightKey) in newLawn.height" :key="heightKey" class="lawn-cell" />
            </div>
          </div>
        </div>
        <div class="button" @click="saveNewLawn">Save</div>
      </div>

      <div id="lawn-data" class="menu">
        <div class="menu-title">Lawn Data</div>
        <div class="option-set">
          <div class="option option-title"><span colspan="2" v-text="grassData.name" /></div>
          <div v-for="(value, key) in sortedGrassData" :key="key" class="option">
            <div class="option-title" v-text="value.name" /><div class="option-value" v-text="value.content" />
          </div>
        </div>
      </div>

      <EventList class="menu" :lawn="selectedLawn.name" />
    </div>
  </div>
</template>

<script>
import {EventBus} from './EventBus'
import util from './utilities'
import Lawn from './components/Lawn.vue'
import Radio from './components/Radio.vue'
import EventList from './components/EventList.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {Lawn, Radio, EventList},
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
      selectedLawn: {},
      grassData: {},
      events: [],
      grassTypes: [],
      noLawns: true,

      newLawn: {
        name: '',
        width: 4,
        height: 4,
        zip: null,
        grass_type_id: null
      }
    }
  },
  computed: {
    sortedGrassData() {
      return [
        { "name": "Color", "content": this.grassData.color },
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
      this.noLawns = false
      this.selectedLawn.name = this.lawns[0].name
      this.lawnSelected()
    }

    this.grassTypes = await util.getGrassTypes()
  },

  methods: {
    async lawnSelected() {
      let lawnData = await util.getLawnData(this.selectedLawn.name)
      if (lawnData) {
        lawnData = lawnData.data
        this.selectedLawn = lawnData.lawns
        this.grassData = lawnData.grass_types
        this.events = lawnData.events
      }
    },

    resetDatabase() {
      util.resetDatabase()
    },

    async saveChanges() {
      let response = await util.saveLawn(this.selectedLawn)
      // Visually alert user lawn has been saved
    },

    saveNewLawn() {
      let response = util.saveNewLawn(this.newLawn)
      console.log(response)
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
    "event-list event-list event-list";
}

#tile-modifiers {
  grid-area: l_sidebar;
}

#lawn-container {
  grid-area: main;
  min-width: 600px;
  display: flex;
  justify-content: center;
}

#lawn-data {
  grid-area: r_sidebar;
}

#event-list {
  grid-area: event-list;
}

#add-lawn-menu {
  min-width: 600px;
}

#lawn-size-preview {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.lawn-cell {
  width: 25px;
  height: 25px;
  border: 1px dotted var(--color-secondary-200);
}

.menu {
  min-width: 200px;
  padding: 20px;
  margin: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 3px 1px rgba(0,0,0,0.3);
  height: auto;
  background-color: var(--color-secondary-100);
}

.menu-title {
  /* font-size: 1.75em; */
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 1px solid var(--color-secondary-300);
  margin: 0 -20px;
  padding-bottom: 20px;
  letter-spacing: 2px;
  color: var(--color-secondary-700);
}

.option-set-title {
  margin: 20px 0 5px;
  color: var(--color-secondary-800);
  font-weight: bold;
  text-align: left
}

.option-set {
  background-color: rgb(255,255,255);
  border-radius: 10px;
  border: 1px solid var(--color-secondary-200);
  width: 100%;
  margin: 10px 0 10px 0;
}

.menu .option {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border-bottom: 1px solid var(--color-secondary-200);
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
