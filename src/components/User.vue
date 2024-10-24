<template>
  <div class="user-management-container">
    <h2>Gestion des utilisateurs</h2>
    <form
      class="create-user-form"
      @submit.prevent="createUser"
    >
      <input
        v-model="newUser.username"
        placeholder="Nom d'utilisateur"
        required
      >
      <input
        v-model="newUser.email"
        placeholder="Email"
        type="email"
        required
      >
      
      <!-- Sélecteur pour le rôle -->
      <select 
        v-model="newUser.role" 
        required
      >
        <option 
          disabled 
          value=""
        >
          Sélectionner un rôle
        </option>
        <option value="Employé">
          Employé
        </option>
        <option value="Manager">
          Manager
        </option>
        <option value="general_manager">
          General Manager
        </option>
      </select>

      <button
        class="create-btn"
        type="submit"
      >
        Créer Utilisateur
      </button>
    </form>
    <hr class="divider">
    <input
      v-model="searchQuery"
      class="search-input"
      placeholder="Rechercher un utilisateur..."
    >
    
    <div 
      v-if="filteredUsers.length > 0" 
      class="user-list-container"
    >
      <h3>Liste des utilisateurs :</h3>
      <ul class="user-list">
        <!-- Afficher uniquement les utilisateurs de la page actuelle -->
        <li
          v-for="user in paginatedUsers"
          :key="user.id"
          class="user-item"
          @click="redirectToEditUser(user.id)"
        >
          <span class="user-info">{{ user.username }}</span>
          <span class="user-info">{{ user.email }}</span>
          <span class="user-info">{{ user.role }}</span>
        </li>
      </ul>

      <!-- Pagination: boutons Suivant et Précédent -->
      <div class="pagination">
        <button 
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Précédent
        </button>
        <button 
          class="pagination-btn"
          :disabled="currentPage >= totalPages"
          @click="nextPage"
        >
          Suivant
        </button>
      </div>
    </div>
    
    <div v-else>
      <!-- eslint-disable-next-line--> 
      <p class="no-user">Aucun utilisateur trouvé.</p>
    </div>
    <hr class="divider">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserManagement',
  data() {
    return {
      users: [],
      searchQuery: '',
      newUser: {
        username: '',
        email: '',
        role: ''
      },
      currentPage: 1, // Page courante
      itemsPerPage: 7 // Limite d'utilisateurs par page
    };
  },
  computed: {
    // Filtrer les utilisateurs selon la recherche
    filteredUsers() {
      return this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    // Diviser les utilisateurs par page
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredUsers.slice(start, end);
    },

    // Calculer le nombre total de pages
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
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
        .then(() => {
          this.getAllUsers();
        })
        .catch(error => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
        });
    },
     verifyIdentity(users) {
  const foundUser = users.find(u => u.email === sessionStorage.getItem('email'));
  
  if (foundUser) {
    if (foundUser.role !== "general_manager") {
      // Vérifier que la route 'forbidden' existe dans votre fichier de routes
      this.$router.push({ name: 'forbidden' }).catch(err => {
        console.error('Erreur lors de la redirection vers la page d\'interdiction :', err);
      });
    } else {
      console.log("L'utilisateur est un general_manager, accès autorisé.");
    }
  } else {
    console.log('Utilisateur non trouvé dans l\'API, mais email trouvé via Firebase');
  }
},
    
    getAllUsers() {
      axios.get('https://time-manager-par2-58868fe31538.herokuapp.com/api/users')
        .then(response => {
          this.users = response.data.data;
          this.verifyIdentity(this.users);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de la liste des utilisateurs :', error);
        });
    },

   

    // Redirection vers la page de modification de l'utilisateur
    redirectToEditUser(userId) {
      this.$router.push({ name: 'EditUser', params: { id: userId } });
    },

    // Passer à la page suivante
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    // Revenir à la page précédente
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
/* Conteneur principal */
.user-management-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Titre principal */
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

/* Formulaire de création d'utilisateur */
.create-user-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.create-user-form input,
.create-user-form select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Bouton de création */
.create-btn {
  padding: 10px 15px;
  background-color: #36A2EB;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-btn:hover {
  background-color: #258cd1;
}

/* Barre de recherche */
.search-input {
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Liste des utilisateurs */
.user-list-container {
  margin-top: 20px;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  color: #4a4a4a;
  cursor: pointer;
}

.user-info {
  flex: 1;
  text-align: left;
  color: #333;
}

.user-info:not(:last-child) {
  margin-right: 10px;
}

/* Texte pour les utilisateurs non trouvés */
.no-user {
  text-align: center;
  color: #999;
  font-size: 16px;
}

/* Ligne de séparation */
.divider {
  margin: 20px 0;
  border: none;
  height: 1px;
  background-color: #ccc;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.pagination-btn {
  padding: 10px 15px;
  background-color: #36A2EB;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-btn:hover {
  background-color: #258cd1;
}

.pagination-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>