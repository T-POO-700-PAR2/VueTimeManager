<template>
  <div class="meteo-container">
    <h1>Metéo</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher une ville"
    >

    <ul
      v-if="filteredCities.length"
      class="cities-grid"
    >
      <li
        v-for="city in filteredCities"
        :key="city.city"
      >
        <h3>{{ city.city }}</h3>
        <p class="text">
          Température : <span class="temperature">{{ city.temperature }}°C</span>
        </p>
        <p class="text">
          Humidité : {{ city.humidity }}%
        </p>
        <p class="text">
          Vitesse du vent : {{ city.wind_speed }} km/h
        </p>
        <p class="text">
          Condition : {{ city.condition }}
        </p>

        <h4>Prévisions :</h4>
        <ul class="forecast-grid">
          <li
            v-for="forecast in city.forecast"
            :key="forecast.day"
            class="forecast-item"
          >
            <p class="text center">
              {{ forecast.day }}
            </p>
            <p class="text">
              Température :
            </p><p> {{ forecast.temperature }}°C</p>
            <p class="text">
              Condition : {{ forecast.condition }}
            </p>
          </li>
        </ul>
      </li>
    </ul>

    <p v-else>
      Aucune ville trouvée
    </p>
  </div>
</template>

<script>
import { getAllDataMeteo } from './service/api';

export default {
    name: 'MeteoComponent',
    data() {
        return {
            cities: [],
            searchQuery: ''
        };
    },
    computed: {
        filteredCities() {
            return this.cities.filter(city =>
                city.city.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    mounted() {
        const allDataCities = getAllDataMeteo();
        this.cities = allDataCities.cities;
    }
};
</script>

<style scoped>
.meteo-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f6f9;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 3%;
}

input {
    padding: 12px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 500px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}
.text{
    color: black;
}

input:focus {
    outline: none;
    border-color: #42b983;
    box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
}

.cities-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    align-content: flex-start;
}

li {
    background-color: white;
    padding: 15px;
    width: calc(33.33% - 20px);
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

li:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

p {
    font-size: 0.9rem;
    color: #555;
    margin: 5px 0;
}

.temperature {
    font-weight: bold;
    color: #ff5722;
}

h4 {
    font-size: 1rem;
    margin-top: 10px;
    color: #42b983;
}

.forecast-item {
    background-color: #f9fbfd;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 5px;
    font-size: 0.9rem;
    color: #666;
    width: 113px;
}

p {
    text-align: center;
    font-size: 1.1rem;
    color: #ff5722;
    margin-top: 20px;
}

.forecast-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
    margin-top: 10px;
}

.forecast-item {
    background-color: #f9fbfd;
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.forecast-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
    li {
        width: calc(50% - 20px);
        /* 2 blocs côte à côte sur tablette */
    }
}

@media (max-width: 768px) {
    li {
        width: 100%;
        /* Un bloc par ligne sur mobile */
    }
}
</style>