<template>
  <div>
    <h2>Gestion des temps de travail</h2>
    <input
      v-model="startTime"
      placeholder="Heure de début (YYYY-MM-DDTHH:MM:SSZ)"
    >
    <input
      v-model="endTime"
      placeholder="Heure de fin (YYYY-MM-DDTHH:MM:SSZ)"
    >
    <button @click="createWorkingTime">
      Ajouter un temps de travail
    </button>
    <button @click="updateWorkingTime">
      Mettre à jour un temps de travail
    </button>
    <button @click="deleteWorkingTime">
      Supprimer un temps de travail
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: '',
      endTime: '',
      workingTimeId: null,
    };
  },
  methods: {
    isValidDate(dateStr) {
      const date = new Date(dateStr);
      return !isNaN(date.getTime());
    },


    formatDateToISO(dateStr) {
      const date = new Date(dateStr);
      return date.toISOString();
    },

    createWorkingTime() {
      if (!this.startTime || !this.endTime) {
        console.error("Les heures de début et de fin doivent être renseignées.");
        return;
      }

      if (!this.isValidDate(this.startTime) || !this.isValidDate(this.endTime)) {
        console.error("Les dates fournies ne sont pas valides.");
        return;
      }

      this.$axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times', {
        working_time: {
          start: this.formatDateToISO(this.startTime),
          end: this.formatDateToISO(this.endTime),
          user_id: 1,
        }
      }).then(() => {
        console.log('Temps de travail créé');
      }).catch(error => {
        console.error('Erreur lors de la création du temps de travail:', error);
      });
    },

    updateWorkingTime() {
      if (!this.isValidDate(this.startTime) || !this.isValidDate(this.endTime)) {
        console.error("Les dates fournies ne sont pas valides.");
        return;
      }

      this.$axios.put(`https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times/${this.workingTimeId}`, {
        working_time: {
          start: this.formatDateToISO(this.startTime),
          end: this.formatDateToISO(this.endTime)
        }
      }).then(() => {
        console.log('Temps de travail mis à jour');
      }).catch(error => {
        console.error('Erreur lors de la mise à jour du temps de travail:', error);
      });
    },

    deleteWorkingTime() {
      this.$axios.delete(`https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times/${this.workingTimeId}`)
        .then(() => {
          console.log('Temps de travail supprimé');
        }).catch(error => {
          console.error('Erreur lors de la suppression du temps de travail:', error);
        });
    }
  }
}
</script>
