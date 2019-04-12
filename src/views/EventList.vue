<template>
  <div>
    <h1>Event Listing</h1>
    <p>
      <router-link :to="{ name: 'event-show', params: { id: '1' } }"
        >First Event</router-link
      >
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
