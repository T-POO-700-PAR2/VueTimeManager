<template>
  <div>
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
    <div class="working-times-container">
      <h2>Temps de travail de {{ user.username }}</h2>
      <div v-if="workingTimes && workingTimes.length > 0">
        <ul class="working-times-list">
          <li
            v-for="time in workingTimes"
            :key="time.id"
          >
            {{ formatTime(time.start) }} - {{ formatTime(time.end) }}
          </li>
        </ul>
        <div class="chart-container">
          <canvas id="line-chart" />
        </div>
      </div>
      <div
        v-else
        class="no-data"
      >
        <p>Aucun temps de travail n'a été ajouté !</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Chart } from 'chart.js/auto';


export default {
/* eslint-disable */
  props: ["id"], 
  data() {
    return {
      userId: this.id, 
      workingTimes: [],
      user: {
        username: "",
        email: "",
        role: ""
      }
    };
  },
  mounted() {
    this.getUserDetails(); 
    this.getWorkingTimes();
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
      getWorkingTimes() {
    //this.$axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times?user_id=${this.userId}`)
      this.$axios.get(`http://localhost:4000/api/working_times/${this.userId}`)
        .then(response => {
          this.workingTimes = response.data.data;
          console.log('mon cons', this.workingTimes)
          this.$nextTick(() => {
            this.createLineChart();
          });
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des temps de travail:', error);
        });
    },
    createLineChart() {
      const hoursByDay = this.calculateHoursByDay();
      const labels = Object.keys(hoursByDay);
      const data = Object.values(hoursByDay);

      if (this.lineChart) {
        this.lineChart.destroy();
      }

      const ctx = document.getElementById('line-chart').getContext('2d');
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Heures travaillées',
            data: data,
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderWidth: 2,
            tension: 0.3 
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#4a4a4a',
                font: {
                  size: 14
                }
              }
            },
            title: {
              display: true,
              text: 'Évolution des heures travaillées par jour',
              color: '#333',
              font: {
                size: 18,
                weight: 'bold'
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Jours',
                color: '#333',
                font: {
                  size: 14
                }
              },
              ticks: {
                color: '#4a4a4a'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Heures travaillées',
                color: '#333',
                font: {
                  size: 14
                }
              },
              beginAtZero: true,
              ticks: {
                color: '#4a4a4a'
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    formatTime(time) {
      const date = new Date(time);
      return date.toLocaleString();
    },
    calculateHoursByDay() {
      const hoursByDay = {};

      this.workingTimes.forEach(time => {
        const startDate = new Date(time.start);
        const endDate = new Date(time.end);
        const workedHours = (endDate - startDate) / (1000 * 60 * 60);
        const day = startDate.toLocaleDateString();

        if (!hoursByDay[day]) {
          hoursByDay[day] = workedHours;
        } else {
          hoursByDay[day] += workedHours;
        }
      });

      return hoursByDay;
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