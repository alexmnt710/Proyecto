<script setup>
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import {User} from '../../stores/user';
import Header from '../header.vue';
import { onMounted } from 'vue';

const swal = sweetalert();
const router = useRouter()
const userStore = User();


onMounted(() => {
    console.log(userStore.sessionAdmin)
});

</script>
<template>
    <div class="body_vue">
        <Header/>
        <div class="container-fluid">
          <div class="row justify-content-center align-items-center" style="height: 70vh;">
            <div class="col-2">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name: 'Cursos' }">
                        <button type="button" class="btn_hw btn btn-primary custom-btn">
                            <i class="bi bi-mortarboard"></i>
                            <div class="mb-3 mt-2">
                                Cursos
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>
            <div class="col-2">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name: 'Profesores' }">
                        <button type="button" class="btn_hw btn btn-primary custom-btn">
                            <i class="bi bi-person-add"></i>
                            <div class="mb-3 mt-2">
                                Profesores
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>
            <div class="col-2">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name: 'Horarios' }">
                        <button type="button" class="btn_hw btn btn-primary custom-btn">
                            <i class="bi bi-calendar-check"></i>
                            <div class="mb-3 mt-2">
                                Horarios
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>
            <div class="col-2">
                <div class="d-flex justify-content-center">
                    <RouterLink :to="{ name: 'Asistencias' }">
                        <button type="button" class="btn_hw btn btn-primary custom-btn">
                            <i class="bi bi-calendar-check"></i>
                            <div class="mb-3 mt-2">
                                Asistencias
                            </div>
                        </button>
                    </RouterLink>
                </div>
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
  .custom-btn {
    width: 200px; /* Ajusta este valor según sea necesario */
    height: 150px; /* Ajusta este valor según sea necesario */
    font-size: 1.5rem; /* Ajusta el tamaño de fuente del contenido */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.custom-btn i {
    font-size: 2rem; /* Ajusta el tamaño del icono */
}
.watermark::before {
    content: '';
    position: absolute;
    margin-top: 50px;
    width: 100%;
    height: 100%;
    background-image: url('./images/LOGO-ULEAM.png'); /* Ruta a tu imagen */
    background-size: 60%;
    background-position: center;
    opacity: 0.1; /* Ajusta la opacidad según tus necesidades */
    z-index: -1; /* Coloca la imagen detrás del contenido */
    pointer-events: none; /* Permite interactuar con los elementos de contenido */
    background-repeat: no-repeat;
  }
</style>