<template>
  <div class="teams-wrapper">
    <h2>Liste des équipes</h2>
    <ul v-if="teams.length > 0" class="teams-list">
      <li
        v-for="team in teams"
        :key="team.id"
        class="team-item"
      >
        {{ team.name }}
      </li>
    </ul>
    <div v-else class="no-teams">
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

<style scoped>
.teams-wrapper {
  padding: 20px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.teams-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 0 auto;
}

.team-item {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.team-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.no-teams {
  padding: 20px;
  color: #666;
}

@media (max-width: 1024px) {
  .teams-wrapper {
    max-width: 90%;
  }

  .teams-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .teams-wrapper {
    padding: 15px;
    max-width: 95%;
  }

  h2 {
    font-size: 20px;
  }

  .teams-list {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .team-item {
    padding: 12px;
  }
}
</style>