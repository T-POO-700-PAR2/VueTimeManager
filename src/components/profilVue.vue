<!-- eslint-disable -->
<template>
  <div class="profile-container">
    <h1>Profil de {{ user.username || firebaseUserEmail || 'Utilisateur introuvable' }}</h1>

    <div v-if="user.email || firebaseUserEmail">
      <div v-if="!isEditing">
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
        <button class="edit-profile-btn" @click="startEditing">
          Modifier le profil
        </button>
        <button class="delete-profile-btn" @click="deleteProfile">
          Supprimer le profil
        </button>
      </div>

      <div v-else class="edit-form">
        <div class="profile-item">
          <p>Username</p>
          <input 
            type="text" 
            v-model="editedUser.username" 
            class="edit-input"
          />
        </div>
        <div class="profile-item">
          <p>Email</p>
          <input 
            type="email" 
            v-model="editedUser.email" 
            class="edit-input"
          />
        </div>
        <!-- Affichage du rôle en lecture seule pendant l'édition -->
        <div class="profile-item" v-if="user.role">
          <p>Role</p>
          <span>{{ user.role }}</span>
        </div>
        <div class="edit-buttons">
          <button class="save-btn" @click="saveChanges">
            Enregistrer
          </button>
          <button class="cancel-btn" @click="cancelEditing">
            Annuler
          </button>
        </div>
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
import { signOut } from "firebase/auth";


export default {
  name: 'ProfilComponent',

  data() {
    return {
      user: {},
      users: [],
      firebaseUserEmail: null,
      isEditing: false,
      editedUser: {
        username: '',
        email: ''
        // Suppression du rôle des données éditables
      }
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

    startEditing() {
      this.editedUser = {
        username: this.user.username,
        email: this.user.email || this.firebaseUserEmail
        // Le rôle n'est pas copié dans editedUser
      };
      this.isEditing = true;
    },

    cancelEditing() {
      this.isEditing = false;
      this.editedUser = {
        username: '',
        email: ''
      };
    },

    async saveChanges() {
      try {
        const response = await axios.put(
          `https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.user.id}`,
          {
            user: {
              ...this.editedUser,
              role: this.user.role // Garde le rôle original inchangé
            }
          }
        );
        
        if (response.data) {
          this.user = response.data.data;
          this.isEditing = false;
          alert('Profil mis à jour avec succès!');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Une erreur est survenue lors de la mise à jour du profil.');
      }
    },

    deleteProfile() {
      if (confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.")) {
        axios.delete(`https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.user.id}`)
          .then(() => {
            alert("Votre profil a été supprimé avec succès.");
            sessionStorage.clear();
           signOut(auth);
            this.$router.push('/login');
          })
          .catch(error => {
            console.error("Erreur lors de la suppression du profil :", error);
            alert("Une erreur est survenue lors de la suppression de votre profil.");
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

.edit-profile-btn, .save-btn {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-profile-btn:hover, .save-btn:hover {
  background-color: #0056b3;
}

.delete-profile-btn, .cancel-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #d9534f;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-profile-btn:hover, .cancel-btn:hover {
  background-color: #c9302c;
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

.edit-input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.edit-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.save-btn {
  margin-top: 0;
}

.cancel-btn {
  margin-top: 0;
  background-color: #6c757d;
}

.cancel-btn:hover {
  background-color: #545b62;
}

p {
  font-size: 1.1rem;
  color: #777;
}
</style>