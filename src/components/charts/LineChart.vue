<template>
  <div>
    <h3>Line Chart</h3>
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>
import { Line } from 'chart.js';

export default {
  mounted() {
    new Line(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Working Time',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [10, 20, 30, 40, 50, 60, 70]
        }]
      },
      options: {}
    });
  }
};
</script>
