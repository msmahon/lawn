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
  border: 1px solid var(--color-primary-700);
  cursor: pointer;
}

.tile:hover {
  border: 1px dotted var(--color-primary-300);
}

.health-good {
  background-color: var(--color-primary-800);
}

.health-fair {
  background-color: var(--color-primary-500);
}

.health-dead {
  background-color: var(--color-secondary-400);
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

.ants::after {
  content: '🐜';
}
</style>
