<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import {User} from '../../stores/user';
import {ref} from 'vue';
import { onMounted } from 'vue';

const swal = sweetalert();
const router = useRouter()
const userStore = User();

const email = ref('');
const password = ref('');

onMounted(() => {
    console.log(userStore.admin)
});

const login = async () => {
    if (!email.value || !password.value) {
        swal.errorAlert('Error de credenciales', 'Por favor, complete los campos')
      return;
    }else{
        try {
            const response = await userStore.login(email.value, password.value);
            
            if (response == true ) {
                swal.successAlert('Inicio de sesión exitoso', 'Bienvenido a la plataforma de administración');
                router.push('/admin');
            }else {
                swal.errorAlert('Error de credenciales', 'Correo o contraseña incorrectos')
            }
        } catch (error) {
            
        }
    }
};

</script>
<template>
    <div class="body_vue">
        <div class="container-fluid">
            <div class="row justify-content-center align-items-center" style="height: 96vh;">
              <div class="col-md-4">
                <form @submit.prevent="login" class="shadow p-3 mb-5 bg-body rounded">
                  <h2 class="text-center mb-4">Iniciar sesión</h2>
                  <div class="mb-3">
                    <label for="email" class="form-label">Correo electrónico o usuario</label>
                    <input type="text" class="form-control" v-model="email">
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" v-model="password">
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
                </form>
              </div>
            </div>
          </div>
    </div>

</template>

<style scoped>
/* Estilos adicionales para personalizar el formulario */
body {
    background-color: #f8f9fa;
  }
  
  .container-fluid {
    padding: 0;
  }
  
  .shadow {
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
</style>