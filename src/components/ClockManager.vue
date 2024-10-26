<template>
  <div class="work-time-container">
    <h2>Gestion des horaires pour {{ username }}</h2>
    <p class="description">
      Cliquez sur le bouton ci-dessous pour {{ isClockRunning ? 'terminer' : 'commencer' }} votre journée de travail.
    </p>
    <button
      class="clock-btn"
      :class="{ 'active': isClockRunning }"
      :disabled="isLoading"
      @click="clockInOut"
    >
      {{ isClockRunning ? 'Pointer Sortie' : 'Pointer Entrée' }}
    </button>
    <p 
      v-if="isLoading" 
      class="status-message"
    >
      Chargement...
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: sessionStorage.getItem('id'),
      username: sessionStorage.getItem('username'),
      isClockRunning: false,
      isLoading: true,
      lastClockTime: null,
    };
  },
  mounted() {
    this.initializeClockStatus();
  },
  methods: {
    initializeClockStatus() {
  this.isLoading = true;

  const storedClockState = localStorage.getItem(`clockState_${this.userId}`);
  const storedClockTime = localStorage.getItem(`clockTime_${this.userId}`);

  // Vérification si l'état de l'horloge et l'heure sont disponibles
  if (storedClockState && storedClockTime) {
    const lastClockTime = new Date(storedClockTime);
    const now = new Date();

    const isSameDay = lastClockTime.getDate() === now.getDate() &&
                      lastClockTime.getMonth() === now.getMonth() &&
                      lastClockTime.getFullYear() === now.getFullYear();

    if (isSameDay) {
      this.isClockRunning = storedClockState === 'true';
      this.lastClockTime = lastClockTime;
      this.isLoading = false;
      return;
    }
  }

  // Si pas d'état stocké ou nouveau jour, vérifier avec le serveur
  this.$axios.get(`http://localhost:4000/api/working_times/${this.userId}`)
    .then(response => {
      const lastSession = response.data.data;
      const lastSessionTime = new Date(lastSession.start);
      const now = new Date();

      const isSameDay = lastSessionTime.getDate() === now.getDate() &&
                        lastSessionTime.getMonth() === now.getMonth() &&
                        lastSessionTime.getFullYear() === now.getFullYear();

      this.isClockRunning = isSameDay ? lastSession.end === null : false;
      this.lastClockTime = isSameDay ? lastSessionTime : null;

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

      if (!this.isClockRunning) {
        this.isClockRunning = true; 
        this.lastClockTime = new Date(); 
        this.saveClockState(); 
        console.log('Pointage d\'entrée effectué à:', this.lastClockTime);
      } else {
        const payload = {
          working_time: {
            start: this.lastClockTime.toISOString(), 
            end: currentTime, 
            user_id: this.userId 
          }
        };

        this.$axios.post('http://localhost:4000/api/working_times', payload)
          .then(response => {
            this.isClockRunning = false; 
            this.lastClockTime = null; 
            this.saveClockState(); 
            console.log('Pointage de sortie réussi:', response.data);
          })
          .catch(error => {
            console.error('Erreur lors du changement d\'état de l\'horloge :', error);
          });
      }

      this.isLoading = false; 
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