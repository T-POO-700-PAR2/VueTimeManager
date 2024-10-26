  <template>
  <div class="working-times-container">
      <h2>Temps de travail pour l'utilisateur {{ username }}</h2>
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
  </template>

  <script>
  import { Chart } from 'chart.js/auto';

  export default {
    data() {
      return {
        workingTimes: [],
        userId: 5,
        username: '',
        lineChart: null
      };
    },
    mounted() {
      this.getWorkingTimes();
      this.fetchUserInfo();
    },
    methods: {
      getWorkingTimes() {
        this.$axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times?user_id=${this.userId}`)
          .then(response => {
            this.workingTimes = response.data.data;
            this.$nextTick(() => {
              this.createLineChart();
            });
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des temps de travail:', error);
          });
      },

      fetchUserInfo() {
        this.$axios.get(`https://time-manager-par2-58868fe31538.herokuapp.com/api/users/${this.userId}`)
          .then(response => {
            this.username = response.data.data.username;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur :', error);
          });
      },

      formatTime(time) {
        const date = new Date(time);
        return date.toLocaleString();
      },

      calculateHoursByDay() {
        const hoursByDay = {};

        this.workingTimes.forEach(time => {
          time.start = undefined;
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
      }
    }
  };
  </script>

  <style scoped>
.working-times-container {
  width: 1080px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.working-times-list {
  padding: 0;
  margin-bottom: 20px;
  list-style: none; /* Ajout de cette ligne pour enlever les puces */
}

.working-times-list li {
  background-color: #fff;
  margin: 10px 0;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  color: #4a4a4a;
}

.no-data {
  text-align: center;
  color: #999;
  font-size: 16px;
}

.chart-container {
  margin: 20px auto;
  width: 100%;
  max-width: 800px;
  height: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>