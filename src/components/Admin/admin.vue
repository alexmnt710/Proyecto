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
            <p>Esto es admin</p>
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