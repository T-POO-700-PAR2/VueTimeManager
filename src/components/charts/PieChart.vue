<template>
  <div>
    <h3>Pie Chart</h3>
    <canvas id="pie-chart"></canvas>
  </div>
</template>

<script>
import { Pie } from 'chart.js';

export default {
  mounted() {
    new Pie(document.getElementById('pie-chart'), {
      type: 'pie',
      data: {
        labels: ['Working', 'Break', 'Meeting'],
        datasets: [{
          label: 'Activity Distribution',
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)'],
          data: [60, 20, 20]
        }]
      },
      options: {}
    });
  }
};
</script>
