import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/dashboard', component: Dashboard },
  { path: '/forgot-password', component: ForgotPassword},
  { path: '/profile', name: 'Profile', component: Profile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
