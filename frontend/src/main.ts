import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'


//toast configuratio for the vue 
const options = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

const app = createApp(App)
app.use(router)
app.use(Toast, options)
app.mount('#app')
