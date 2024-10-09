<template>
  <div>
    <h2>Manage Working Time</h2>
    <input v-model="startTime" placeholder="Start Time" />
    <input v-model="endTime" placeholder="End Time" />
    <button @click="createWorkingTime">Add Working Time</button>
    <button @click="updateWorkingTime">Update Working Time</button>
    <button @click="deleteWorkingTime">Delete Working Time</button>
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
    createWorkingTime() {
      // Logique pour ajouter une nouvelle heure de travail
    },
    updateWorkingTime() {
      // Logique pour mettre à jour une heure de travail
    },
    deleteWorkingTime() {
      // Logique pour supprimer une heure de travail
    }
  }
}
</script>

<style scoped>
/* Style pour la gestion des heures de travail */
</style>
