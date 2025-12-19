import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Dashboard from '../views/Dashboard.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'
import About from '../views/about.vue'
import States from '../views/states.vue'
import Thingstodo from '../views/thingstodo.vue'
import Travelidea from '../views/travelidea.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/dashboard', component: Dashboard },
  { path: '/forgot-password', component: ForgotPassword},
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/about', name: 'About', component: About },
  { path: '/states', name: 'States', component: States },
  { path: '/things-to-do', name: 'ThingsToDO', component: Thingstodo },
  { path: '/travel-idea', name: 'TravelIdea', component: Travelidea },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
