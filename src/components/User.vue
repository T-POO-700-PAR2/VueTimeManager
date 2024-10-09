<!-- eslint-disable -->
<template>
  <div>
    <h2>Gestion des utilisateurs</h2>
    <form @submit.prevent="createUser">
      <input v-model="newUser.name" placeholder="Nom" required />
      <input v-model="newUser.email" placeholder="Email" required />
      <button type="submit">Créer Utilisateur</button>
    </form>

    <button @click="getUser">Récupérer l'utilisateur</button>
    <div v-if="user">
      <h3>Détails de l'utilisateur :</h3>
      <p>Nom : {{ user.name }}</p>
      <p>Email : {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: 1, // ID par défaut
      user: null, // Détails utilisateur récupérés
      newUser: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    createUser() {
      axios.post('/api/users', this.newUser)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('Erreur:', error);
        });
    },
    getUser() {
      axios.get(`/api/users/${this.userId}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('Erreur:', error);
        });
    }
  }
};
</script>
