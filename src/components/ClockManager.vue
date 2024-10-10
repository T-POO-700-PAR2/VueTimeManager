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
      clockIn: false,
    };
  },
  methods: {
    clockInOut() {
      // Définit l'heure actuelle en format ISO
      const currentTime = new Date().toISOString();

      // Créer les données à envoyer pour le pointage
      const payload = {
        clock: {
          user_id: this.userId,
          status: !this.clockIn, // Change l'état selon que l'utilisateur pointe entrée ou sortie
          time: currentTime
        }
      };

      this.$axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/clocks', payload)
        .then(() => {
          this.clockIn = !this.clockIn; // Inverse l'état après un succès
        })
        .catch(error => {
          console.error('Erreur lors du changement d\'état de l\'horloge :', error);
        });
    },
  },
};
</script>
