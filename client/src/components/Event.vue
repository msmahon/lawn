<template>
  <div class="event-block">
test
  </div>
</template>

<script>

export default {
  name: 'Event',
  components: {},
  props: {
    data: {
      type: Object,
      default: Object
    }
  },
  data: function() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style>
.event-block {
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>
