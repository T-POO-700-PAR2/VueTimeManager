<template>
  <div>
    <h3>Bar Chart</h3>
    <Bar :chart-data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Work Hours',
            backgroundColor: '#42A5F5',
            data: [40, 39, 30, 35, 38]
          }
        ]
      }
    };
  }
}
</script>
