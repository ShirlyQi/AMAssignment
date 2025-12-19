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
import Sabah from '../views/place/sabah.vue'
import Johor from '../views/place/johor.vue'
import Kedah  from '../views/place/kedah.vue'
import Kelantan from '../views/place/kelantan.vue'
import KL from '../views/place/kl.vue'
import Melaka from '../views/place/melaka.vue'
import N9 from '../views/place/n9.vue'
import Penang from '../views/place/penang.vue'
import Perlis from '../views/place/perlis.vue'
import Sarawak from '../views/place/sarawak.vue'
import Selangor from '../views/place/selangor.vue'
import Terengganu from '../views/place/terengganu.vue'


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
  { path: '/sabah', name: 'Sabah', component: Sabah },
  { path: '/johor', name: 'Johor', component: Johor },
  { path: '/kedah', name: 'Kedah', component: Kedah },
  { path: '/kelantan', name: 'Kelantan', component: Kelantan },
  { path: '/kl', name: 'KL', component: KL },
  { path: '/melaka', name: 'Melaka', component: Melaka },
  { path: '/n9', name: 'N9', component: N9 },
  { path: '/penang', name: 'Penang', component: Penang },
  { path: '/perlis', name: 'Perlis', component: Perlis },
  { path: '/sarawak', name: 'Sarawak', component: Sarawak },
  { path: '/selangor', name: 'Selangor', component: Selangor },
  { path: '/terengganu', name:'Terengganu' ,component : Terengganu }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
