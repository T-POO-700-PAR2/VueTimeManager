<!-- eslint-disable -->
<template>
  <nav class="navbar" v-if="user">
    <ul>
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
  background-color: #bababa;
  padding: 1rem;
  color: white;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.navbar li {
  display: inline;
}

.navbar a {
  color: white;
  text-decoration: none;
}

.navbar a:hover {
  text-decoration: underline;
}

.navbar button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.navbar button:hover {
  text-decoration: underline;
}
</style>
