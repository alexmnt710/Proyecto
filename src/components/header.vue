<script setup>
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../composables/sweetAlert';
import {User} from '../stores/user';

const swal = sweetalert();
const router = useRouter()
const userStore = User();

const logout = async () => {
    try {
        const response = await userStore.logout();
        if (response == true ) {
            swal.successAlert('Cierre de sesión exitoso', 'Hasta luego');
            router.push('/');
        }else {
            swal.errorAlert('Error al cerrar sesión', 'Por favor, intente nuevamente')
        }
    } catch (error) {
        
    }
};

</script>
<template>
    <nav class="navbar bg-body-tertiary header_base">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../assets/img/Uleam.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top">
            </a>
            <div class="d-flex">
                <div class="btn-group">
                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-gear-fill"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end hovet_ul">
                        <li><a class="dropdown-item" style="color: rgb(43, 146, 224) ;" @click="logout">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </nav>
    <a class="edit_boton ">
        Administrador
    </a>
</template>
<style scoped>
.text_none{
    text-decoration: none;
    color: black;
}
.edit_boton{
    text-decoration: none;
    color: black;
    background: greenyellow;
    padding: 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}
.header_base{
    border-bottom: 0.1mm solid rgb(154, 149, 149);
    background: rgb(234, 228, 228) !important;

}
.hovet_ul li :hover{
    background: rgb(43, 146, 224) !important;
    color: white !important;
    cursor: pointer;
}

</style>