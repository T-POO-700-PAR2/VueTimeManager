import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import App from './App.vue';
import User from './components/User.vue';
import WorkingTimes from './components/WorkingTimes.vue';
import WorkingTime from './components/WorkingTime.vue';
import ClockManager from './components/ClockManager.vue';
import ChartManager from './components/ChartManager.vue';

axios.defaults.baseURL = 'http://localhost:4000/api';

const routes = [
  { path: '/workingTimes/:userID', component: WorkingTimes },
  { path: '/workingTime/:userID', component: WorkingTime },
  { path: '/workingTime/:userID/:workingtimeID', component: WorkingTime },
  { path: '/clock/:userID', component: ClockManager },
  { path: '/chartManager/:userID', component: ChartManager },
  { path: '/user', component: User },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);

app.mount('#app');
