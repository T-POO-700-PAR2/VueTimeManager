<template>
  <div>
    <h2>Temps de travail pour l'utilisateur {{ userId }}</h2>
    <div v-if="workingTimes && workingTimes.length > 0">
      <ul>
        <li v-for="time in workingTimes" :key="time.id">
          {{ formatTime(time.start) }} - {{ formatTime(time.end) }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun temps de travail trouvé pour cet utilisateur.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 1,
      workingTimes: []
    };
  },
  mounted() {
    this.getWorkingTimes();
  },
  methods: {
    getWorkingTimes() {
      this.$axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times?user_id=${this.userId}`)
        .then(response => {
          this.workingTimes = response.data.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des temps de travail:', error);
        });
    },

    formatTime(time) {
      const date = new Date(time);
      return date.toLocaleString();
    }
  }
};
</script>

<style scoped>
ul
{
  list-style-type: none;
}
</style>
