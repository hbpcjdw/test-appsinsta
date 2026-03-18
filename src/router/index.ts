import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import HomePage from '../views/Home.vue';
import SearchPage from '../views/SearchPage.vue';
import AddPage from '../views/AddPage.vue';
import ActivityPage from '../views/ActivityPage.vue';
import ProfilePage from '../views/ProfilePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'Home',
        component: HomePage
      },
      {
        path: 'search',
        name: 'Search',
        component: SearchPage
      },
      {
        path: 'add',
        name: 'Add',
        component: AddPage
      },
      {
        path: 'activity',
        name: 'Activity',
        component: ActivityPage
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfilePage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
