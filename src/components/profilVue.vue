<!-- eslint-disable -->
<template>
  <div class="profile-container">
    <h1>Profil de {{ user.username || firebaseUserEmail || 'Utilisateur introuvable' }}</h1>

    <div v-if="user.email || firebaseUserEmail">
      <div class="profile-item" v-if="user.username">
        <p>Username</p>
        <span>{{ user.username }}</span>
      </div>
      <div class="profile-item">
        <p>Email</p>
        <span>{{ user.email || firebaseUserEmail }}</span>
      </div>
      <div class="profile-item" v-if="user.role">
        <p>Role</p>
        <span>{{ user.role }}</span>
      </div>
    </div>

    <div v-else>
      <p>Aucun utilisateur trouvé avec cet email.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { auth } from './firebase';

export default {
  name: 'ProfilComponent',

  data() {
    return {
      user: {},
      users: [],
      firebaseUserEmail: null,
    };
  },

  mounted() {
    this.getFirebaseUser();
  },

  methods: {
    getFirebaseUser() {
      const user = auth.currentUser;
      if (user) {
        this.firebaseUserEmail = user.email;
        this.getAllUsers();
      } else {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.firebaseUserEmail = user.email;
            this.getAllUsers();
          }
        });
      }
    },

    getUserProfile(data) {
      const foundUser = data.find(u => u.email === this.firebaseUserEmail);
      if (foundUser) {
        this.user = foundUser;
      } else {
        console.log('Utilisateur non trouvé dans l\'API, mais email trouvé via Firebase');
      }
    },

    getAllUsers() {
      axios.get('https://time-manager-par2-58868fe31538.herokuapp.com/api/users')
        .then(response => {
          this.users = response.data.data;
          this.getUserProfile(this.users);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de la liste des utilisateurs :', error);
        });
    }
  }
};
</script>

<style scoped>
.profile-container {
  margin-top: 2%;
  max-width: 600px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
}

.profile-item {
  margin-bottom: 15px;
  text-align: left;
}

.profile-item p {
  display: inline-block;
  font-weight: bold;
  margin-right: 10px;
}

.profile-item span {
  font-size: 1.2rem;
  color: #555;
}

p {
  font-size: 1.1rem;
  color: #777;
}
</style>
