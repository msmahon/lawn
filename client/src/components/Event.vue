<template>
  <div class="event-block">
    <div v-text="humanDate"></div>
  </div>
</template>

<script>
import moment from "moment"

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
  computed: {
    humanDate() {
      return moment(this.data.date).fromNow()
    }
  },
  methods: {}
}
</script>

<style>
.event-block {
  width: 100%;
  height: auto;
  margin: 10px;
  padding: 5px;
  background-color: rgb(255,255,255);
  border: 1px solid hsl(150,8%, 70%);
  border-radius: 6px;
}
</style>
