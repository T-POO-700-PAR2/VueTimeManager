<template>
  <div class="work-time-container">
    <h2>Gestion des horaires pour {{ username }}</h2>
    <p class="description">
      Cliquez sur le bouton ci-dessous pour {{ clockIn ? 'terminer' : 'commencer' }} votre journée de travail.
    </p>
    <button
      class="clock-btn"
      :class="{ 'active': clockIn }"
      @click="clockInOut"
    >
      {{ clockIn ? 'Pointer Sortie' : 'Pointer Entrée' }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 1,
      username: '',
      clockIn: false,
    };
  },
  mounted() {
    this.fetchUserInfo();
    this.checkClockStatus();
  },
  methods: {
    fetchUserInfo() {
      this.$axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.userId}`)
        .then(response => {
          this.username = response.data.data.username;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des informations utilisateur :', error);
        });
    },
    checkClockStatus() {
      // Vérifiez le statut actuel de l'horloge
      this.$axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/clocks/${this.userId}`)
        .then(response => {
          this.clockIn = response.data.data.status;
        })
        .catch(error => {
          console.error('Erreur lors de la vérification du statut de l\'horloge :', error);
        });
    },
    clockInOut() {
      const currentTime = new Date().toISOString();
      
      const payload = {
        clock: {
          user: this.userId,
          status: !this.clockIn,
          time: currentTime
        }
      };

      this.$axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/clocks', payload)
        .then(response => {
          this.clockIn = response.data.data.status;
          console.log('Pointage réussi:', response.data);
        })
        .catch(error => {
          console.error('Erreur lors du changement d\'état de l\'horloge :', error);
        });
    }
  }
};
</script>

<style scoped>
.work-time-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f4f4f9;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.description {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.clock-btn {
  padding: 15px 30px;
  font-size: 18px;
  color: white;
  background-color: #36a2eb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

.clock-btn:hover {
  background-color: #258cd1;
}

.clock-btn:active {
  transform: scale(0.98); 
}

.clock-btn.active {
  background-color: #eb4034; 
}

.clock-btn.active:hover {
  background-color: #d13428;
}
</style>