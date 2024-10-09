<template>
  <div>
    <h2>Gestion des horaires pour l'utilisateur {{ userId }}</h2>
    <button @click="clockInOut">{{ clockIn ? 'Pointer Sortie' : 'Pointer Entrée' }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 1,
      clockIn: false, // Par défaut, on suppose que l'utilisateur n'est pas pointé
    };
  },
  methods: {
    clockInOut() {
      const endpoint = this.clockIn
        ? `/clocks/${this.userId}/clock_out`
        : `/clocks/${this.userId}/clock_in`;

      this.$axios.post(endpoint)
        .then(() => {
          // On inverse l'état de "clockIn" après une réponse réussie
          this.clockIn = !this.clockIn;
        })
        .catch(error => {
          console.error('Erreur lors du changement d\'état de l\'horloge :', error);
        });
    },
  },
};
</script>
