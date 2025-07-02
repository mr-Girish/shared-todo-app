// import { createRouter, createWebHistory } from 'vue-router'
// // import LoginPage from '../pages/LoginPage.vue'
// import Home from '../pages/Home.vue'
// import Register from '../components/Register.vue'

// const routes = [
//   // { path: '/', redirect: '/login' },
//   { path: '/',component:Home},
//    { path: '/register',component:Register}
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// export default router



import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LoginForm.vue'
import Register from '../components/RegisterForm.vue'
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  {
    path: '/todos',
    component:'' ,
    meta: { requiresAuth: true }
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router




