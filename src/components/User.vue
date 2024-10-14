<!-- eslint-disable -->
<template>
  <div>
    <h2>Gestion des utilisateurs</h2>

    <form @submit.prevent="createUser">
      <input v-model="newUser.username" placeholder="Nom d'utilisateur" required />
      <input v-model="newUser.email" placeholder="Email" required />
      <input v-model="newUser.role" placeholder="Rôle" required />
      <button class="gest-fnl-btn" type="submit">Créer Utilisateur</button>
    </form>

    <hr />

    <input v-model="searchQuery" placeholder="Rechercher un utilisateur..." />

    <div v-if="filteredUsers.length > 0">
      <h3>Liste des utilisateurs :</h3>
      <ul>
        <li v-for="user in filteredUsers" :key="user.id">
          {{ user.username }} - {{ user.email }} - {{ user.role }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun utilisateur trouvé.</p>
    </div>

    <hr />

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: 1,
      user: null,
      users: [],
      searchQuery: '',
      newUser: {
        username: '',
        email: '',
        role: ''
      }
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    createUser() {
      axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/users', {
        user: this.newUser
      })
        .then(response => {
          this.user = response.data;
          this.getAllUsers();
        })
        .catch(error => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
        });
    },

    getUser() {
      axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.userId}`)
        .then(response => {
          this.user = response.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        });
    },

    getAllUsers() {
      axios.get('https://time-manager-par2-58868fe31538.herokuapp.com/api/users')
        .then(response => {
          this.users = response.data.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de la liste des utilisateurs :', error);
        });
    }
  }
};
</script>

<style scoped>
button.gest-fnl-btn {
  margin-top: 1rem;
}
ul
{
  list-style-type: none;
}
</style>
