<!-- src/components/AppNavbar.vue -->
<template>
  <nav class="navbar" v-if="user">
    <div class="navbar-brand">
      <h1>GOTHtime </h1>
    </div>
    <ul class="navbar-menu">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/workingTimes/1">Working Times</router-link></li>
      <li><router-link to="/teams">Teams</router-link></li>
      <li><router-link to="/user">User Profile</router-link></li>
      <li><router-link to="/clock/1">Clock</router-link></li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<script>
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default {
  name: "AppNavbar", // Changement ici
  data() {
    return {
      user: auth.currentUser,
    };
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        this.$router.push('/login');
      } catch (error) {
        console.error("Error logging out", error);
      }
    }
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  /* Darker color for the navbar */
  padding: 1rem 2rem;
  /* Add more padding for better spacing */
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* Subtle shadow effect */
}

.navbar-brand {
  font-size: 1.5rem;
  /* Bigger font size for the brand name */
  font-weight: bold;
  /* Bold for emphasis */
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  /* Increased gap between items */
}

.navbar li {
  display: inline;
}

.navbar a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
  /* Smooth transition on hover */
}

.navbar a:hover {
  color: #1abc9c;
  /* Change color on hover */
  text-decoration: underline;
}

.navbar button {
  background: #e74c3c;
  /* Distinct color for the logout button */
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  /* Added padding for better button size */
  border-radius: 5px;
  /* Rounded corners */
  cursor: pointer;
  transition: background-color 0.3s ease;
  /* Smooth transition for hover */
}

.navbar button:hover {
  background: #c0392b;
  /* Darker red on hover */
}
</style>