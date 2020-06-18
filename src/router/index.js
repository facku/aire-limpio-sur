import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/consulta',
    name: 'Consulta',
    component: () => import(/* webpackChunkName: "consulta" */ '../views/Consulta.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

//Mando todas las rutas a consulta, unica feature desarollada
// cambiar esto cuando desarrolle el langing y el dashboard de adminsitracion
router.beforeEach((from, to, next) => {
  if (from.path !== '/consulta') {
    next('/consulta');
  } else {
    next();
  }
});

export default router;
