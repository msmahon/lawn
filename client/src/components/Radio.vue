<template>
  <div class="radio-menu">
    <div
      v-for="option in options"
      :key="option"
      class="radio-option"
      @click="select(option)"
    >
      <div :class="{ active: selected == option && currentSelection == attribute }" class="indicator">
        &nbsp;
      </div>
      <div class="radio-text" v-text="capitalize(option)" />
    </div>
  </div>
</template>

<script>
import { EventBus } from '../EventBus'

export default {
  name: 'Radio',
  props: {
    options: {
      type: Array,
      required: true
    },
    attribute: {
      type: String,
      required: true
    },
    currentSelection: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      selected: ''
    }
  },
  computed: {

  },
  methods: {
    select: function(value) {
      this.selected = value
      // emit event to parent with selection
      EventBus.$emit('attributeUpdate', [this.attribute, this.selected])
    },
    capitalize: function(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>
.radio-menu {
  position: relative;
  background-color: rgb(255,255,255);
  border-radius: 6px;
  border: 1px solid hsl(150,8%, 70%);
}

.radio-option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid hsl(150, 8%, 70%);
  width: auto;
}

.radio-text {
  text-align: right;
}

.radio-option:last-child {
  border: none;
}

.radio-option:hover {
  background-color: hsl(150, 8%, 90%);
}

.radio-option:last-child:hover {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.radio-option:first-child:hover {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.indicator {
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: hsl(150, 8%, 70%);
}

.active {
  background-color: green;
  box-shadow: 0 0 10px green;
}

</style>
