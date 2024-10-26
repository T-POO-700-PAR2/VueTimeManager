<template>
  <div>
    <h1>Time Management and Work Conditions Overview</h1>
    <div class="fixed-div">
      <h3>Méteo</h3>
      <Meteo />
    </div>

    <div class="card-container">
      <div class="card">
        <div class="card-header">
          <h3>Work Hours Distribution by Category</h3>
        </div>
        <div class="card-body">
          <canvas
            id="bar-chart"
            class="bar"
          />
          <p>
            This bar chart displays the distribution of work hours among employees, managers, 
            and the general manager. It helps visualize how time is spent across different 
            categories, shedding light on the workload disparity and areas of concern, such as 
            excessive working hours.
          </p>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>Employee Performance Over Time</h3>
        </div>
        <div class="card-body">
          <canvas
            id="line-chart"
            class="line"
          />
          <p>
            This line chart tracks the daily and weekly performance of employees over a selected 
            period. It helps managers and the general manager monitor trends in productivity, 
            spot unusual patterns, and ensure employees are not overworked due to extended shifts.
          </p>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h3>Complaints and Work Conditions Breakdown</h3>
        </div>
        <div class="card-body">
          <canvas
            id="pie-chart"
            class="pie"
          />
          <p>
            This pie chart shows the percentage of employee complaints regarding various aspects 
            of their work conditions, such as long shifts, the city's deplorable state, and other 
            concerns like Batman’s lack of scruples. It helps the town hall understand the most 
            pressing issues and take corrective measures to improve working conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, BarController, LineController, PieController, BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Title } from 'chart.js';
import Meteo from './meteo.vue';
import axios from 'axios';
import { auth } from './firebase';

export default {
  components: {
   Meteo 
  },
  data() {
    return {
      barChartData: null,
      lineChartData: null,
      pieChartData: null,
      firebaseUserEmail: null,
      role: sessionStorage.getItem('role')
    };
  },
  mounted() {
    Chart.register(
      BarController,
      LineController,
      PieController,
      BarElement,
      LineElement,
      PointElement,
      ArcElement,
      CategoryScale,
      LinearScale,
      Title
    );

    this.loadChartData();
    this.getFirebaseUser();

  },
  
  methods: {
    loadChartData() {
      this.$axios.get(`/working_times?user_id=1`)
        .then(response => {
          const data = response.data;

          if (data) {
            this.barChartData = this.formatBarChartData(data);
            this.lineChartData = this.formatLineChartData(data);
            this.pieChartData = this.formatPieChartData(data);
            this.renderCharts();
          } else {
            console.error('Pas de données trouvées pour les graphiques.');
          }
        })
        .catch(error => {
          console.error('Erreur lors du chargement des données du graphique :', error);
        });
    },
    renderCharts() {
      const ctxBar = document.getElementById('bar-chart').getContext('2d');
      new Chart(ctxBar, {
        type: 'bar',
        data: this.barChartData,
      });

      const ctxLine = document.getElementById('line-chart').getContext('2d');
      new Chart(ctxLine, {
        type: 'line',
        data: this.lineChartData,
      });

      const ctxPie = document.getElementById('pie-chart').getContext('2d');
      new Chart(ctxPie, {
        type: 'pie',
        data: this.pieChartData,
      });
    },
    formatBarChartData(data) {
      return {
        labels: data.data.map(item => new Date(item.start).toLocaleDateString()),
        datasets: [{
          label: 'Heures de travail',
          backgroundColor: '#42A5F5',
          data: data.data.map(item => new Date(item.end) - new Date(item.start)),
        }],
      };
    },
    formatLineChartData(data) {
      return {
        labels: data.data.map(item => new Date(item.start).toLocaleDateString()),
        datasets: [{
          label: 'Heures de travail',
          borderColor: '#66BB6A',
          pointBackgroundColor: '#FF6384',
          data: data.data.map(item => new Date(item.end) - new Date(item.start)),
        }],
      };
    },
    formatPieChartData(data) {
      return {
        labels: data.data.map(item => new Date(item.start).toLocaleDateString()),
        datasets: [{
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          data: data.data.map(item => new Date(item.end) - new Date(item.start)),
        }],
      };
    },
    getFirebaseUser() {
      if (!this.role) {
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
      }
    },

    getUserProfile(data) {
      const foundUser = data.find(u => u.email === this.firebaseUserEmail);
      if (foundUser) {
        this.user = foundUser;
        sessionStorage.setItem("role", foundUser.role);
        sessionStorage.setItem("id", foundUser.id);
        sessionStorage.setItem("id", foundUser.username);
      } else {
        console.log('Utilisateur non trouvé dans l\'API, mais email trouvé via Firebase');
      }
    },

    getAllUsers() {
      axios.get('https://time-manager-par2-58868fe31538.herokuapp.com/api/users')
        .then(response => {
          let users = response.data.data;
          this.getUserProfile(users);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération de la liste des utilisateurs :', error);
        });
    }

  },
};
</script>
<style scoped>
h1{
  margin-top: 2%;
}
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f9;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 1.8em;
  }

  .fixed-div {
    position: fixed;
    top: 226px; 
    right: 20px; 
    width: 200px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    z-index: 1000; 
  }

  .fixed-div h3 {
    font-size: 1.2em;
    margin-top: 0;
    margin-bottom: 10px;
  }

  .fixed-div ul {
    list-style-type: none;
    padding-left: 0;
  }

  .fixed-div ul li {
    margin-bottom: 8px;
  }

  .fixed-div ul li a {
    text-decoration: none;
    color: #2c3e50;
    font-size: 0.9em;
  }

  .fixed-div ul li a:hover {
    text-decoration: underline;
  }

  .card {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    padding: 15px;
    transition: transform 0.3s;
    max-width: 385px;
    margin: 0 auto 20px auto;
  }

  .card:hover {
    transform: translateY(-3px);
  }

  .card-header h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.3em;
  }

  .card-body {
    margin-top: 15px;
  }

  .card p {
    color: #666;
    font-size: 0.85em;
    line-height: 1.4;
  }

  canvas {
    width: 100% !important;
    max-width: 100%;
    height: auto !important;
    margin-bottom: 10px;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 15px;
  }

  @media (max-width: 768px) {
    .fixed-div {
      top: auto;
      bottom: 20px;
      right: 10px;
      width: 160px; 
    }

    .card {
      padding: 10px;
    }

    .card-header h3 {
      font-size: 1.1em;
    }
  }
</style>