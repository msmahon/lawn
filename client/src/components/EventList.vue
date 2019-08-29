<template>
  <div id="event-list">
    <Event v-for="event in events" :data="event" :key="event.id" />
  </div>
</template>

<script>
import Event from './Event.vue'

export default {
  name: 'EventList',
  components: {Event},
  props: {},
  data: function() {
    return {
      events: [
        {id:1, type: "water", date: "2019-08-23"},
        {id:2, type: "water", date: "2019-08-24"},
        {id:3, type: "water", date: "2019-08-25"},
        {id:4, type: "water", date: "2019-08-26"},
        {id:5, type: "water", date: "2019-08-27"},
      ]
    }
  },
  computed: {},
  methods: {}
}
</script>

<style>
#event-list {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>
