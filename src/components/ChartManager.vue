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
export default {
  data() {
    return {
      barChartData: null,
      lineChartData: null,
      pieChartData: null,
    };
  },
  mounted() {
    this.loadChartData();
  },
  methods: {
    loadChartData() {
      this.$axios.get('/working_times?user_id=1')
        .then(response => {
          const data = response.data;

          if (data) {
            this.barChartData = this.formatBarChartData(data);
            this.lineChartData = this.formatLineChartData(data);
            this.pieChartData = this.formatPieChartData(data);
          } else {
            console.error('Pas de données trouvées pour les graphiques.');
          }
        })
        .catch(error => {
          console.error('Erreur lors du chargement des données du graphique :', error);
        });
    },
    formatBarChartData(data) {
      return {
        labels: data.map(item => item.date),
        datasets: [{
          label: 'Heures de travail',
          backgroundColor: '#42A5F5',
          data: data.map(item => item.hours_worked),
        }],
      };
    },
    formatLineChartData(data) {
      return {
        labels: data.map(item => item.date),
        datasets: [{
          label: 'Heures de travail',
          borderColor: '#66BB6A',
          data: data.map(item => item.hours_worked),
        }],
      };
    },
    formatPieChartData(data) {
      return {
        labels: data.map(item => item.date),
        datasets: [{
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          data: data.map(item => item.hours_worked),
        }],
      };
    },
  },
};
</script>
