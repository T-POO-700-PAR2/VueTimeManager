<template>
  <div>
    <h2>Liste des équipes</h2>
    <ul v-if="teams.length > 0">
      <li v-for="team in teams" :key="team.id">
        {{ team.name }}
      </li>
    </ul>
    <div v-else>
      <p>Aucune équipe trouvée.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teams: [],
    };
  },
  mounted() {
    this.getTeams();
  },
  methods: {
    getTeams() {
      this.$axios.get('/teams')
        .then(response => {
          this.teams = response.data.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des équipes', error);
        });
    },
  },
};
</script>

<style>
 div {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

ul {
  list-style-type: none;
}

h2 {
  margin: none;
  padding: none;
}

</style>
