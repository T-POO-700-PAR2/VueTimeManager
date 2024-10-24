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
import ProfilVue from './components/profilVue.vue';
import EditUser from './components/EditUser.vue';
import Forbidden from './components/forbidden.vue';

axios.defaults.baseURL = 'https://time-manager-par2-58868fe31538.herokuapp.com/api';

const routes = [
  { path: '/', component: ChartManager },
  { path: '/workingTimes/:userID', component: WorkingTimes },
  { path: '/workingTime/:userID', component: WorkingTime },
  { path: '/workingTime/:userID/:workingtimeID', component: WorkingTime },
  { path: '/clock/:userID', component: ClockManager },
  //verifie si l'user est General manager
  { path: '/user', component: User,beforeEnter: (to, from, next) => {
  const user = sessionStorage.getItem('role');
  if (user  === 'general_manager') {
    next();
  } else {
    next('/forbidden');
  }
}, },
  { path: '/teams', component: TeamsComponent },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/meteo', component: MeteoVue },
  { path: '/profil', component: ProfilVue },
  { path: '/forbidden', name: 'forbidden', component: Forbidden },
  { path: '/user/edit/:id', name: 'EditUser', component: EditUser, props: true }


];

const protectedRoutes = ['/workingTimes', '/clock', '/teams', '/user','profil','/'];

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
