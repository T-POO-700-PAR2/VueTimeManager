<template>
  <div>
    <h2>Working Times</h2>
    <table>
      <tr v-for="time in workingTimes" :key="time.id">
        <td>{{ time.start }}</td>
        <td>{{ time.end }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workingTimes: []
    };
  },
  methods: {
    getWorkingTimes() {
      // Logique pour obtenir les heures de travail via l'API
    }
  },
  mounted() {
    this.getWorkingTimes();
  }
}
</script>

<style scoped>
/* Style pour l'affichage des heures de travail */
</style>
