import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import App from './App.vue';
import User from './components/User.vue';
import WorkingTimes from './components/WorkingTimes.vue';
import WorkingTime from './components/WorkingTime.vue';
import ClockManager from './components/ClockManager.vue';
import ChartManager from './components/ChartManager.vue';
import TeamsComponent from './components/TeamsComponent.vue';
import Login from './components/LoginPage.vue';
import Signup from './components/SignupPage.vue';
import { auth } from '../firebase';
import MeteoVue from './components/MeteoVue.vue';

axios.defaults.baseURL = 'https://time-manager-par2-58868fe31538.herokuapp.com/api';

const routes = [
  { path: '/', component: ChartManager },
  { path: '/workingTimes/:userID', component: WorkingTimes },
  { path: '/workingTime/:userID', component: WorkingTime },
  { path: '/workingTime/:userID/:workingtimeID', component: WorkingTime },
  { path: '/clock/:userID', component: ClockManager },
  { path: '/user', component: User },
  { path: '/teams', component: TeamsComponent },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/meteo', component: MeteoVue },

];

const protectedRoutes = ['/workingTimes', '/clock', '/teams', '/user','/'];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (protectedRoutes.includes(to.path) && !user) {
    next('/login');
  } else {
    next();
  }
});

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);

app.mount('#app');
