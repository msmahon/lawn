<template>
  <div>
    <div id="lawn">
      <div :style="gridStyle">
        <Tile
          v-for="tile in tiles"
          :key="tile.id"
          :tile-data="tile"
          :selections="selections"
          :current-selection="selections.current"
        />
      </div>
    </div>
    <select v-model="selectedLawn" @change="lawnSelected">
      <option
        v-for="lawn in lawns"
        :key="lawn.name"
        :value="lawn.name"
        v-text="lawn.name"
      />
    </select>
    <button @click="resetDatabase">
      Reset Database
    </button>
    <button @click="saveChanges">
      Save Changes
    </button>
  </div>
</template>

<script>
import Tile from './Tile.vue'
import util from '../utilities'

export default {
  name: 'Lawn',
  components: { Tile },
  props: {
    selections: {
      type: Object,
      default: Object
    }
  },
  data: function() {
    return {
      lawns: [],
      tiles: [],
      columns: {},
      selectedLawn: '',
      grassData: {}
    }
  },
  computed: {
    gridStyle() {
      let rows = this.tiles.length / this.columns
      return {
        display: 'grid',
        backgroundColor: 'white',
        gridTemplateRows: `repeat(${rows},1fr)`,
        gridTemplateColumns: `repeat(${this.columns},1fr)`,
      }
    }
  },
  async mounted() {
    this.lawns = await util.getLawns()
    if (this.lawns.length > 0) {
      this.selectedLawn = this.lawns[0].name
      this.lawnSelected()
    }
  },
  methods: {
    async lawnSelected() {
      let results = await util.fetchLawnData(this.selectedLawn)
      results = results.data
      if (results) {
        this.tiles = JSON.parse(results.lawns.data)
        this.columns = results.lawns.columns
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
    }
  }
}
</script>

<style>
  #lawn {
    margin: 0 24px;
  }
</style>
