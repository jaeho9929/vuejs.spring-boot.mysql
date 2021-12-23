import { createWebHistory, createRouter } from 'vue-router';
const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
