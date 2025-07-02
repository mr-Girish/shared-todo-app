
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/LoginForm.vue'
import Register from '../components/RegisterForm.vue'
import Tasks from '../components/Tasks.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },

  {
    path: '/tasks',
    component:Tasks ,
    meta: { requiresAuth: true }
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe() // stop listening
      if (user) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

export default router




