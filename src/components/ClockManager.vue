<template>
  <div class="work-time-container">
    <h2>Gestion des horaires pour {{ username }}</h2>
    <p class="description">
      Cliquez sur le bouton ci-dessous pour {{ isClockRunning ? 'terminer' : 'commencer' }} votre journée de travail.
    </p>
    <button
      class="clock-btn"
      :class="{ 'active': isClockRunning }"
      @click="clockInOut"
      :disabled="isLoading"
    >
      {{ isClockRunning ? 'Pointer Sortie' : 'Pointer Entrée' }}
    </button>
    <p v-if="isLoading" class="status-message">Chargement...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: 5,
      username: '',
      isClockRunning: false,
      isLoading: true,
      lastClockTime: null
    };
  },
  mounted() {
    this.fetchUserInfo();
    this.initializeClockStatus();
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
    initializeClockStatus() {
      this.isLoading = true;

      // Récupérer l'état stocké localement
      const storedClockState = localStorage.getItem(`clockState_${this.userId}`);
      const storedClockTime = localStorage.getItem(`clockTime_${this.userId}`);

      if (storedClockState && storedClockTime) {
        const lastClockTime = new Date(storedClockTime);
        const now = new Date();

        // Vérifier si c'est le même jour
        const isSameDay = lastClockTime.getDate() === now.getDate() &&
                         lastClockTime.getMonth() === now.getMonth() &&
                         lastClockTime.getFullYear() === now.getFullYear();

        if (isSameDay) {
          // Restaurer l'état stocké si c'est le même jour
          this.isClockRunning = storedClockState === 'true';
          this.lastClockTime = lastClockTime;
          this.isLoading = false;
          return;
        }
      }

      // Si pas d'état stocké ou nouveau jour, vérifier avec le serveur
      this.$axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/clocks/${this.userId}`)
        .then(response => {
          const lastSession = response.data.data;
          const lastSessionTime = new Date(lastSession.time);
          const now = new Date();

          const isSameDay = lastSessionTime.getDate() === now.getDate() &&
                           lastSessionTime.getMonth() === now.getMonth() &&
                           lastSessionTime.getFullYear() === now.getFullYear();

          this.isClockRunning = isSameDay ? lastSession.status : false;
          this.lastClockTime = isSameDay ? lastSessionTime : null;

          // Sauvegarder l'état
          this.saveClockState();
        })
        .catch(() => {
          this.isClockRunning = false;
          this.lastClockTime = null;
          this.saveClockState();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    saveClockState() {
      localStorage.setItem(`clockState_${this.userId}`, this.isClockRunning.toString());
      if (this.lastClockTime) {
        localStorage.setItem(`clockTime_${this.userId}`, this.lastClockTime.toISOString());
      } else {
        localStorage.removeItem(`clockTime_${this.userId}`);
      }
    },
    clockInOut() {
      this.isLoading = true;
      const currentTime = new Date().toISOString();
      
      const payload = {
        clock: {
          user: this.userId,
          status: !this.isClockRunning,
          time: currentTime
        }
      };

      this.$axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/clocks', payload)
        .then(response => {
          this.isClockRunning = response.data.data.status;
          this.lastClockTime = new Date(response.data.data.time);
          this.saveClockState();
          console.log('Pointage réussi:', response.data);
        })
        .catch(error => {
          console.error('Erreur lors du changement d\'état de l\'horloge :', error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.work-time-container {
  width: 80vw;
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

.clock-btn:hover:not(:disabled) {
  background-color: #258cd1;
}

.clock-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.clock-btn.active {
  background-color: #eb4034;
}

.clock-btn.active:hover:not(:disabled) {
  background-color: #d13428;
}

.clock-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.status-message {
  margin-top: 10px;
  color: #666;
  font-style: italic;
}
</style>