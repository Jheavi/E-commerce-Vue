import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ItemDetail from '../views/ItemDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
