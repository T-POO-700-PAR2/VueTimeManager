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
      const currentTime = new Date().toISOString();

      const payload = {
        clock: {
          user_id: this.userId,
          status: !this.clockIn,
          time: currentTime
        }
      };

      this.$axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/clocks', payload)
        .then(() => {
          this.clockIn = !this.clockIn;
        })
        .catch(error => {
          console.error('Erreur lors du changement d\'état de l\'horloge :', error);
        });
    },
  },
};
</script>
