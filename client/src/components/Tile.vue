<template>
  <div class="tile" :class="healthClass" @click="updateTile">
    <div
      v-for="condition in tileData.conditions"
      :key="condition"
      class="condition"
      :class="condition"
    />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Tile',
  props: {
    tileData: {
      type: Object,
      default: Object
    },
    selections: {
      type: Object,
      default: Object
    },
    currentSelection: {
      type: String,
      default: 'health'
    }
  },
  data: function() {
    return {}
  },
  computed: {
    healthClass() { return `health-${this.tileData.health}` }
  },
  methods: {
    updateTile() {
      if ('health' === this.currentSelection) this.healthUpdate()
      if ('condition' === this.currentSelection) this.conditionUpdate()
    },
    conditionUpdate() {
      if (this.tileData.conditions.includes(this.selections[this.currentSelection])) {
        this.tileData.conditions = this.tileData.conditions.filter(c => c != this.selections[this.currentSelection])
      } else {
        this.tileData.conditions.push(this.selections[this.currentSelection])
      }
    },
    healthUpdate() {
      this.tileData.health = this.selections.health
    }
  }
}
</script>

<style>
.tile {
  width: 64px;
  height: 64px;
  border: 1px solid hsl(150, 63%, 22%);
  cursor: pointer;
}

.tile:hover {
  border: 1px solid hsl(150, 80%, 78%);
}

.health-good {
  background-color: hsl(150, 56%, 30%);
}

.health-fair {
  background-color: hsl(150, 38%, 53%);
}

.health-dead {
  background-color: hsl(82, 37%, 72%);
}

.condition {
  width: 32px;
  height: 32px;
  float: left;
  font-size: 1.5em;
}

.weeds::after {
  content: '🌱';
}

.clover::after {
  content: '🍀';
}
</style>
