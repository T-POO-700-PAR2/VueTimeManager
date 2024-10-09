<template>
  <div>
    <h3>Pie Chart</h3>
    <Pie :chart-data="chartData" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  data() {
    return {
      chartData: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Votes',
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            data: [12, 19, 3]
          }
        ]
      }
    };
  }
}
</script>
