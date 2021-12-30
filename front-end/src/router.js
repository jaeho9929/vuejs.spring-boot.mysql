import { createWebHistory, createRouter } from 'vue-router';
const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/views/LoginPage')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@/views/RegisterPage')
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: {}
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
export const createVueRouter = () => {
  return createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })
}
