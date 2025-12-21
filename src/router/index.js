import { createRouter, createWebHistory } from 'vue-router'

// 页面组件
import Web from '../views/Web.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Profile from '../views/Profile.vue'
import ProfileAfterHome from '../views/ProfileAfterHome.vue'
import About from '../views/about.vue'
import States from '../views/states.vue'

// 各州页面
import Sabah from '../views/place/sabah.vue'
import Johor from '../views/place/johor.vue'
import Kedah from '../views/place/kedah.vue'
import Kelantan from '../views/place/kelantan.vue'
import KL from '../views/place/kl.vue'
import Melaka from '../views/place/melaka.vue'
import N9 from '../views/place/n9.vue'
import Penang from '../views/place/penang.vue'
import Perlis from '../views/place/perlis.vue'
import Sarawak from '../views/place/sarawak.vue'
import Selangor from '../views/place/selangor.vue'
import Terengganu from '../views/place/terengganu.vue'
import Perak from '../views/place/perak.vue'

// Sabah 表单相关
import Fsabah from '../views/place/form/fsabah.vue'
import Csabah from '../views/place/form/count/csabah.vue'
import admindashboard from '../views/adminDashboard/admindashboard.vue'
import cselangor from '../views/place/form/count/cselangor.vue'
import cjohor from '../views/place/form/count/cjohor.vue'
import ckedah from '../views/place/form/count/ckedah.vue'
import ckelantan from '../views/place/form/count/ckelantan.vue'
import ckl from '../views/place/form/count/ckl.vue'
import cmelaka from '../views/place/form/count/cmelaka.vue'
import cn9 from '../views/place/form/count/cn9.vue'
import cpenang from '../views/place/form/count/cpenang.vue'
import cperak from '../views/place/form/count/cperak.vue'
import cperlis from '../views/place/form/count/cperlis.vue'
import csarawak from '../views/place/form/count/csarawak.vue'
import cterengganu from '../views/place/form/count/cterengganu.vue'

const routes = [
  { path: '/', component: Web },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/home', component: Home },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/profile/me', component: ProfileAfterHome },
  { path: '/about', name: 'About', component: About },
  { path: '/states', name: 'States', component: States },
  { path: '/dashboard', name: 'dasboard', component: admindashboard },

  // 各州路由
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
  { path: '/terengganu', name: 'Terengganu', component: Terengganu },
  { path: '/perak', name: 'Perak', component: Perak },

  // Sabah 表单相关路由
  { path: '/fsabah', name: 'Fsabah', component: Fsabah },
  { path: '/csabah', name: 'Csabah', component: Csabah },

  { path: '/cselangor', name: 'Cselangor', component: cselangor },
  { path: '/ckedah', name: 'Ckedah', component: ckedah },
  { path: '/ckelantan', name: 'Ckelantan', component: ckelantan },
  { path: '/ckl', name: 'Ckl', component: ckl },
  { path: '/cmelaka', name: 'Cmelaka', component: cmelaka },
  { path: '/cn9', name: 'Cn9', component: cn9 },
  { path: '/cpenang', name: 'Cpenang', component: cpenang },
  { path: '/cperak', name: 'Cperak', component: cperak },
  { path: '/cperlis', name: 'Cperlis', component: cperlis },
  { path: '/csarawak', name: 'Csarawak', component: csarawak },
  { path: '/cterengganu', name: 'Cterengganu', component: cterengganu },
  { path: '/cjohor', name: 'Cjohor', component: cjohor },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
