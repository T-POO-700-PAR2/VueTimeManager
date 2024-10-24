<template>
  <div>
    <h1>Time Management and Work Conditions Overview</h1>

    <!-- Div fixe -->
    <div class="fixed-div">
      <h3>Méteo</h3>
      <Meteo />
    </div>

    <div class="card-container">
      <!-- Bar Chart Card -->
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

      <!-- Line Chart Card -->
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

      <!-- Pie Chart Card -->
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
            concerns like Batman's lack of scruples. It helps the town hall understand the most
            pressing issues and take corrective measures to improve working conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, BarController, LineController, PieController, BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import Meteo from './meteo.vue';

export default {
  components: {
   Meteo
  },
  data() {
    return {
      barChartData: null,
      lineChartData: null,
      pieChartData: null,
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
      Title,
      Tooltip,
      Legend
    );

    this.loadChartData();
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
        options: {
          maintainAspectRatio: false,
          responsive: true
        }
      });

      const ctxLine = document.getElementById('line-chart').getContext('2d');
      new Chart(ctxLine, {
        type: 'line',
        data: this.lineChartData,
        options: {
          maintainAspectRatio: false,
          responsive: true
        }
      });

      const ctxPie = document.getElementById('pie-chart').getContext('2d');
      new Chart(ctxPie, {
        type: 'pie',
        data: this.pieChartData,
        options: {
          maintainAspectRatio: false,
          responsive: true
        }
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
  },
};
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  width: 95%;
  margin: 0 auto;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  transition: transform 0.3s;
  height: 400px;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-3px);
}

.card-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1em;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent content overflow */
}

canvas {
  flex: 1;
  max-height: 200px !important;
  width: 100% !important;
  margin-bottom: 10px;
}

h1 {
  margin: 2% 0;
  text-align: center;
  color: #333;
  font-size: 1.8em;
}

/* Style pour la div fixe */
.fixed-div {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  width: 200px;
  background-color: white;
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

.card p {
  color: #666;
  font-size: 0.85em;
  line-height: 1.4;
  margin-top: 10px;
}

@media (max-width: 1200px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .fixed-div {
    position: static;
    width: 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 10px;
  }

  .card {
    height: auto; /* Let content determine height */
    min-height: 300px;
    max-height: 450px;
    padding: 12px;
  }

  .card-header h3 {
    font-size: 1em;
  }

  canvas {
    max-height: 180px !important;
  }

  .card p {
    font-size: 0.8em;
    line-height: 1.3;
    margin-top: 8px;
    /* Make text shorter on mobile */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h1 {
    font-size: 1.3em;
    margin: 15px 0;
  }
}

@media (max-width: 480px) {
  .card-container {
    width: 100%;
    padding: 8px;
    gap: 12px;
  }

  .card {
    min-height: 250px;
    max-height: 350px;
    padding: 10px;
  }

  canvas {
    max-height: 150px !important;
  }

  .fixed-div {
    padding: 10px;
  }

  .card-header h3 {
    font-size: 0.9em;
  }

  .card p {
    font-size: 0.75em;
    margin-top: 6px;
    -webkit-line-clamp: 2; /* Show fewer lines on very small screens */
  }
}
</style>
