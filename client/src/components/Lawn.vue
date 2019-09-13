<template>
  <div>
    <div id="lawn">
      <div :style="gridStyle">
        <Tile
          v-for="tile in data.tiles"
          :key="tile.id"
          :tile-data="tile"
          :selections="selections"
          :current-selection="selections.current"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  name: 'Lawn',
  components: { Tile },
  props: {
    selections: {
      type: Object,
      default: Object
    },
    data: {
      type: Object,
      default: Object
    }
  },
  data: function() {
    return {}
  },
  computed: {
    gridStyle() {
      if (this.data.tiles && this.data.columns) {
        let rows = this.data.tiles.length / this.data.columns
        return {
          display: 'grid',
          backgroundColor: 'white',
          gridTemplateRows: `repeat(${rows},1fr)`,
          gridTemplateColumns: `repeat(${this.data.columns},1fr)`,
        }
      }
      return false;
    }
  },
  methods: {}
}
</script>

<style>
#lawn {
  margin-bottom: 10px;
}
</style>
