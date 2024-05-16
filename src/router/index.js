import { createRouter, createWebHistory } from 'vue-router'
import login from '../components/Admin/login.vue'
import admin from '../components/Admin/admin.vue'
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
        }

    ]
  });
export default router;