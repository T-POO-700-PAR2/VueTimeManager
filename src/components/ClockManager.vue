<template>
  <div>
    <h2>Clock In/Out</h2>
    <div v-if="clockIn">You clocked in at: {{ startDateTime }}</div>
    <button @click="toggleClock">{{ clockIn ? 'Clock Out' : 'Clock In' }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDateTime: null,
      clockIn: false
    };
  },
  methods: {
    toggleClock() {
      this.clockIn = !this.clockIn;
      this.startDateTime = this.clockIn ? new Date().toISOString().slice(0, 19).replace('T', ' ') : null;
    }
  }
}
</script>

<style scoped>
/* Style pour ClockManager */
</style>
