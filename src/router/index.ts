import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import HomePage from '../views/Home.vue';
import SearchPage from '../views/SearchPage.vue';
import AddPage from '../views/AddPage.vue';
import ActivityPage from '../views/ActivityPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import { auth } from '@/services/auth';
import { onAuthStateChanged } from 'firebase/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { guestOnly: true }
  },
  {
    path: '/tabs',
    component: TabsPage,
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe();
    const loggedIn = !!user;

    if (requiresAuth && !loggedIn) {
      next('/login');
    } else if (guestOnly && loggedIn) {
      next('/tabs/home');
    } else {
      next(true);
    }
  });
});

export default router
