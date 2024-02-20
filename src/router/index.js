import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import test from '../views/test.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
