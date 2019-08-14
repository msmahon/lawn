<template>
  <div class="radio-menu">
    <div
      v-for="option in options"
      :key="option"
      class="radio-option"
      @click="select(option)"
      v-text="capitalize(option)"
    />
  </div>
</template>

<script>

export default {
  name: 'Radio',
  props: {
    options: {
      type: Array,
      required: true
    },
    category: {
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
      console.log(value)
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
  border-radius: 4px;
  border: 1px solid hsl(150,8%, 80%);
  margin: 10px 0 10px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3)
}

.radio-option {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid hsl(150, 8%, 80%);
  width: auto;
}

.radio-option:last-child {
  border: none;
}

.radio-option:hover {
  background-color: hsl(150, 8%, 80%);
}

</style>
