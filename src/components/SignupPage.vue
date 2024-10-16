<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            required
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            required
          >
        </div>
        <button
          type="submit"
          class="btn-primary"
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <router-link to="/login">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signup() {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push("/");
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  width: 120%;
}

.auth-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button.btn-primary:hover {
  background-color: #0056b3;
}

p {
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
