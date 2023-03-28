import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    path: '/',
    component: MainPage,
  },
];

const router = new VueRouter({
  routes // сокращённая запись для `routes: routes`
});

export default router;