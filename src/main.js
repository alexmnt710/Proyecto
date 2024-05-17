import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import {User} from './stores/user'
import {Cursos} from './stores/cursos'
import {Profesores} from './stores/profesores'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

const profesores = Profesores()
const user = User()
const cursos = Cursos()
cursos.create(
    {
        id: 1,
        nombre: 'Informatica',
        descripcion: 'Curso de Informatica',
        numeroEstudiantes: 20,
        facultad: 'Ingenieria'
         
    }
)
user.admin = ({
    nombre : 'admin',
    type : 'admin',
    email : 'admin@gmail.com',
    password: 'admin',
})
profesores.create(
    {
        id: 1,
        nombre: 'Walter',
        titulo: 'Doctor en Ciencias Exactas',
        materia: 'Calculo de una variable',
        curso: 'Ingeniera en Sistemas'
    })
