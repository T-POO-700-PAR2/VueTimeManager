<template>
  <nav
    v-if="user"
    class="navbar"
  >
    <div class="navbar-brand">
      <!-- eslint-disable-next-line -->
      <img src="@/assets/logo.png" alt="GOTHtime Logo" class="logo" />
    </div>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">
          Home
        </router-link>
      </li>
      <li>
        <router-link to="/workingTimes/1">
          Working Times
        </router-link>
      </li>
      <li>
        <router-link to="/teams">
          Teams
        </router-link>
      </li>
      <li>
        <router-link to="/user">
          User Profile
        </router-link>
      </li>
      <li>
        <router-link to="/clock/1">
          Clock
        </router-link>
      </li>
      <li>
        <router-link to="/profil">
          Profil
        </router-link>
      </li>
      <li>
        <button @click="logout">
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default {
  name: "AppNavbar",
  data() {
    return {
      user: auth.currentUser,
    };
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },
  methods: {
    async logout() {
      try {
        await signOut(auth);
        sessionStorage.clear();
        this.$router.push('/login');
      } catch (error) {
        console.error("Error logging out", error);
      }
    }
  }
};
</script>

<style scoped>

.logo {
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcfcfc;
  padding: 1rem 2rem;
  color: rgb(0, 0, 0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.navbar-brand {
  font-size: 1.5rem;
}

.navbar-menu {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar li {
  display: inline;
}

.navbar a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar a:hover {
  color: #1abc9c;
  text-decoration: underline;
}

.navbar button {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e74c3c;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  height: 100%;
  transition: background-color 0.3s ease;
}

.navbar button:hover {
  background: #c0392b;
}

</style>
