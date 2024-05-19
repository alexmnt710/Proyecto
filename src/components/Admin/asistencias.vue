<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { computed, ref } from 'vue';
import {sweetalert} from '../../composables/sweetAlert';
import { Asistencia } from '../../stores/asistencia';
import Header from '../header.vue';
const asistencias = Asistencia().asistencias;
const selectedEstado = ref('');

const filteredAsistencias = computed(() => {
    if (!selectedEstado.value) {
        return asistencias;
    }
    return asistencias.filter(asistencia => asistencia.estado === selectedEstado.value);
});

const filterEstado = (estado) => {
    selectedEstado.value = estado;
};
</script>
<template>
    <Header/>
    <div class="container-fluid">
        <div class="row justify-content-center align-items-center" style="height: 70vh;">
            <div class="container mt-4">
                <h2>Listado de Asistencias</h2>
                <div class="d-flex justify-content-center">
                    <button @click="filterEstado('Asistido')" class="btn btn-success mr-2 me-2">Asistido</button>
                    <button @click="filterEstado('Falta')" class="btn btn-danger mr-2 me-2">Ausentes</button>
                    <button @click="filterEstado('')" class="btn btn-success mr-2 me-2">limpiar filtro</button>
                    <button @click="filterEstado('Atraso')" class="btn btn-warning mr-2 me-2">Atraso</button>
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
                        <tr v-if="filteredAsistencias.length === 0">
                            <td colspan="4" class="text-center">No hay asistencias que coincidan con los filtros seleccionados</td>
                        </tr>
                        <tr v-for="asistencia in filteredAsistencias" :key="asistencia.id">
                            <td>{{ asistencia.id }}</td>
                            <td>{{ asistencia.horario }}</td>
                            <td>{{ asistencia.timestamp }}</td>
                            <td>{{ asistencia.estado }}</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
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