<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import {User} from '../../stores/user';
import {ref} from 'vue';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';


const swal = sweetalert();
const router = useRouter()
const userStore = User();

const email = ref('');
const password = ref('');

onMounted(() => {
    console.log(userStore.admin)
});

const formu = async () => {
  try {
    await Swal.fire({
      title: 'Cambio de Contraseña',
      text: 'Estás en la función para cambiar contraseña',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Continuar'
    });

    const { value: emailOrUsername } = await Swal.fire({
      title: 'Buscar Usuario',
      text: 'Por favor, introduce el usuario del que deseas cambiar la contraseña',
      input: 'text',
      inputPlaceholder: 'Usuario',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un valor!';
        }
      }
    });

    if (!emailOrUsername) {
      throw new Error('Cancelado');
    }

    // Simula una búsqueda de usuario
    const [found, user] = await userStore.findWithUser(emailOrUsername);

    if (found) {
      const { value: newPassword } = await Swal.fire({
        title: 'Usuario Encontrado',
        text: 'Introduce la nueva contraseña',
        input: 'password',
        inputPlaceholder: 'Nueva contraseña',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Debes ingresar una contraseña!';
          }
        }
      });

      if (!newPassword) {
        throw new Error('Cancelado');
      }
      console.log('Nueva contraseña:', newPassword);
      await userStore.cambioPassword(newPassword);
      await Swal.fire('Contraseña cambiada', 'Tu contraseña ha sido actualizada', 'success');
    } else {
      await Swal.fire('Error', 'Usuario no encontrado', 'error');
    }
  } catch (error) {
    if (error.message !== 'Cancelado') {
      console.error('Error inesperado:', error);
    }
  }
};


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
              <input type="text" class="form-control" v-model="email" id="email">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input type="password" class="form-control" v-model="password" id="password">
            </div>
            <div class="text-right mt-3">
              <a href="/forgot-password" class="text-decoration-none" @click.submit.prevent="formu">¿Olvidaste tu contraseña?</a>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <button type="submit" class="btn btn-primary">Iniciar sesión</button>
            </div>
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