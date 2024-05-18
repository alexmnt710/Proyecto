<script setup>
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import { Asistencia } from '../../stores/asistencia';
import Header from '../header.vue';
const asistencias= Asistencia().asistencias;

const filterEstado = (estado) => {
    asistencias = asistencias.filter(asistencia => asistencia.estado === estado);
    
};
</script>
<template>
    <Header/>
    <div class="container mt-4">
        <h2>Listado de Asistencias</h2>
        <div class="d-flex justify-content-center">
            <button @click="filterEstado('Presente')" class="btn btn-success mr-2">Presentes</button>
            <button @click="filterEstado('Ausente')" class="btn btn-danger">Ausentes</button>
        </div>
        <table class="table table-striped table-hover mt-3">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Horario</th>
                    <th>Timestamp</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asistencia in asistencias" :key="asistencia.id">
                    <td>{{ asistencia.id }}</td>
                    <td>{{ asistencia.horario }}</td>
                    <td>{{ asistencia.timestamp }}</td>
                    <td>{{ asistencia.estado }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.container {
    max-width: 800px;
    margin: auto;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.table {
    background-color: white;
    border-radius: 5px;
    overflow: hidden;
}

.thead-dark th {
    background-color: #343a40;
    color: white;
}
</style>