<template>
  <div class="user-view">
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
        <input
          v-model="newUser.role"
          placeholder="Rôle"
          required
        >
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
          <li
            v-for="user in filteredUsers"
            :key="user.id"
            class="user-item"
          >
            <span class="user-info">{{ user.username }}</span>
            <span class="user-info">{{ user.email }}</span>
            <span class="user-info">{{ user.role }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="no-user">
          Aucun utilisateur trouvé.
        </p>
      </div>
      <hr class="divider">
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManagementView',
  data() {
    return {
      userId: 1,
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
    getAllUsers() {
      this.$axios.get('/users')
        .then(response => {
          this.users = response.data.data;
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des utilisateurs:', error);
        });
    },
    createUser() {
      this.$axios.post('/users', {
        user: this.newUser
      })
        .then(() => {
          this.getAllUsers();
          this.newUser = {
            username: '',
            email: '',
            role: ''
          };
        })
        .catch(error => {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        });
    }
  }
};
</script>

<style scoped>
.user-view {
  padding: 20px;
}

.user-management-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-user-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

.create-user-form input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.create-btn {
  padding: 10px;
  background: #36A2EB;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-btn:hover {
  background: #2e8cd1;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: white;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-info {
  flex: 1;
  padding: 0 10px;
}

.divider {
  border: none;
  border-top: 1px solid #ddd;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .user-item {
    flex-direction: column;
    gap: 10px;
  }
  
  .user-info {
    padding: 5px 0;
  }
}

@media (max-width: 480px) {
  .user-view {
    padding: 10px;
  }
  
  .user-management-container {
    padding: 15px;
  }
}
</style>