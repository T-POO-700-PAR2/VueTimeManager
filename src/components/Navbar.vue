<!-- src/components/AppNavbar.vue -->
<template>
  <nav
    v-if="user"
    class="navbar"
  >
    <div class="navbar-brand">    
      <img :src="require('@/assets/gotham.jpg')" alt="Gotham">
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
  name: "AppNavbar", // Changement ici
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
        this.$router.push('/login');
      } catch (error) {
        console.error("Error logging out", error);
      }
    }
  }
};
</script>

<style scoped>


/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0.75rem 2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-brand img {
  height: 40px;
  width: auto;
  margin-right: 0.5rem;
}

.navbar-menu {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.navbar a {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.navbar a:hover,
.navbar a.router-link-active {
  color: #0f172a;
}

.navbar button {
  background: #ef4444;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.navbar button:hover {
  background: #dc2626;
}

/* Dashboard Styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
}

h1 {
  text-align: center;
  color: #0f172a;
  margin: 2rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

/* Style pour la div fixe */
.fixed-div {
  position: fixed;
  top: 5rem;
  right: 1.5rem;
  width: 180px;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: none;
}

.fixed-div h3 {
  font-size: 1rem;
  margin: 0 0 0.75rem 0;
  color: #0f172a;
}

/* Container des cards */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem 2rem;
}

/* Style des cards */
.card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-header h3 {
  margin: 0;
  color: #0f172a;
  font-size: 1rem;
  font-weight: 600;
}

.card-body {
  margin-top: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card p {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-top: auto;
  margin-bottom: 0;
}

/* Style des graphiques */
canvas {
  width: 100% !important;
  height: 220px !important;
  margin-bottom: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .navbar-menu {
    gap: 1rem;
  }

  .navbar-brand img {
    height: 32px;
  }

  .card-container {
    padding: 0 1rem 1.5rem;
    gap: 1rem;
  }

  .card {
    padding: 1rem;
  }

  canvas {
    height: 180px !important;
  }
}

@media (min-width: 1024px) {
  .fixed-div {
    display: block;
  }
  
  .card-container {
    margin-right: 220px;
  }
}

@media (min-width: 1440px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>