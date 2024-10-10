<template>
  <div>
    <h3>Bar Chart</h3>
    <canvas id="bar-chart"></canvas>

    <h3>Line Chart</h3>
    <canvas id="line-chart"></canvas>

    <h3>Pie Chart</h3>
    <canvas id="pie-chart"></canvas>
  </div>
</template>

<script>
import { Chart, BarController, LineController, PieController, BarElement, LineElement, ArcElement, PointElement, CategoryScale, LinearScale, Title } from 'chart.js';

export default {
  data() {
    return {
      barChartData: null,
      lineChartData: null,
      pieChartData: null,
    };
  },
  mounted() {
    // Enregistrer les types et éléments de graphiques nécessaires
    Chart.register(
      BarController,
      LineController,
      PieController,
      BarElement,
      LineElement,
      PointElement,      // Ajout de PointElement pour le graphique en ligne
      ArcElement,
      CategoryScale,
      LinearScale,
      Title
    );

    // Charger les données des graphiques
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
      // Bar chart
      const ctxBar = document.getElementById('bar-chart').getContext('2d');
      new Chart(ctxBar, {
        type: 'bar',
        data: this.barChartData,
      });

      // Line chart
      const ctxLine = document.getElementById('line-chart').getContext('2d');
      new Chart(ctxLine, {
        type: 'line',
        data: this.lineChartData,
      });

      // Pie chart
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
          pointBackgroundColor: '#FF6384',  // Points color
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
