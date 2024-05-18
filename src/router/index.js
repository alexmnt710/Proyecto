import { createRouter, createWebHistory } from 'vue-router'
import login from '../components/Admin/login.vue'
import admin from '../components/Admin/admin.vue'
import cursos from '../components/Admin/cursos.vue'
import profesores from '../components/Admin/profesores.vue'
import horarios from '../components/Admin/horarios.vue'
import asistencias from './../components/Admin/asistencias.vue'
const router = createRouter({
    history: createWebHistory('/Rawr/'), 
    routes: [
        {
            path: '/',
            name: 'Login',
            component: login,
            meta: { requiresAuth: false } // Marca la ruta como no requiere autenticación
      
        },
        {
          path: '/admin',
          name: 'Admin',
          component:admin,
          meta: { requiresAuth: true }
        },
        {
          path: '/crud_profesores',
          name:'Profesores',
          component:profesores,
          meta:{requiresAuth: true}
        },
        {
          path: '/crud_cursos',
          name:'Cursos',
          component:cursos,
          meta:{requiresAuth: true}
        },
        {
          path: '/crud_horarios',
          name:'Horarios',
          component:horarios,
          meta:{requiresAuth: true}
        },
        {
          path: '/asistencias',
          name:'Asistencias',
          component:asistencias,
          meta:{requiresAuth: true}
        }

    ]
  });
export default router;