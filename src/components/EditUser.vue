<template>
  <div>
    <!-- eslint-disable-next-line--> 
    <button @click="goBack" class="back-btn">
      Retour
    </button>
    <h2>Modifier l'utilisateur {{ user.username }}</h2>
    <form @submit.prevent="updateUser">
      <div>
        <label>Nom d'utilisateur :</label>
        <!-- eslint-disable-next-line--> 
        <input v-model="user.username" required />
      </div>
      <div>
        <label>Email :</label>
        <!-- eslint-disable-next-line--> 
        <input v-model="user.email" type="email" required />
      </div>
      <div>
        <label>Rôle :</label>
        <!-- eslint-disable-next-line--> 
        <select v-model="user.role" required>
          <option value="employe">
            Employé
          </option>
          <option value="manager">
            Manager
          </option>
          <option value="general_manager">
            General Manager
          </option>
        </select>
      </div>
      <button type="submit">
        Enregistrer les modifications
      </button>
    </form>
    <button 
      class="delete-btn"
      @click="deleteUser" 
    >
      Supprimer l'utilisateur
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
/* eslint-disable */
  props: ["id"], 
  data() {
    return {
      userId: this.id, 
      user: {
        username: "",
        email: "",
        role: ""
      }
    };
  },
  mounted() {
    this.getUserDetails(); 
  },
  methods: {
    getUserDetails() {
      axios
        .get(
          `https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.userId}`
        )
        .then((response) => {
          this.user = response.data.data;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des détails de l'utilisateur :",
            error
          );
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    updateUser() {
        const userData = {
            "user":{
                        email: this.user.email,
                        username: this.user.username,
                        role: this.user.role
        }
        
      };

    
      axios
        .put(
          `https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.userId}`,
          userData
        )
        .then(() => {
          alert("Utilisateur mis à jour avec succès");
          this.$router.push("/user");
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        });
    },
    deleteUser() {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        axios
          .delete(
            `https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.userId}`
          )
          .then(() => {
            alert("Utilisateur supprimé avec succès");
            this.$router.push("/users");
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
          });
      }
    }
  }
};
</script>

<style scoped>
div {
  max-width: 500px;
  margin-top: 2%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

.back-btn {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #5a6268;
}

h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
  text-align: left;
}

input,
select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #4cae4c;
}

.delete-btn {
  margin-top: 20px;
  background-color: #d9534f;
}

.delete-btn:hover {
  background-color: #c9302c;
}
</style>