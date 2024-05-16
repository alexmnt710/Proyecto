import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import {User} from './stores/user'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const user = User()

user.admin = ({
    nombre : 'admin',
    type : 'admin',
    email : 'admin@gmail.com',
    password: 'admin',
})
