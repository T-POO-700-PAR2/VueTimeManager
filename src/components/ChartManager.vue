<template>
  <div>
    <h2>Chart Manager</h2>
    <BarChart />
    <LineChart />
    <PieChart />
  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue';
import LineChart from './charts/LineChart.vue';
import PieChart from './charts/PieChart.vue';

export default {
  components: {
    BarChart,
    LineChart,
    PieChart
  }
};
</script>
