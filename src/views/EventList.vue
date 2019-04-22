<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <p>
      <router-link :to="{ name: 'event-show', params: { id: '1' } }">First Event</router-link>
    </p>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventServices.js'

export default {
  components: {
    EventCard
  },
  data: function() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log('There was error', error.message)
      })
  }
}
</script>

<style lang="scss" scoped></style>
