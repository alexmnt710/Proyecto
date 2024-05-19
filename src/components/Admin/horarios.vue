<script setup>
import Header from '../header.vue';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import { Cursos } from '../../stores/cursos';
import { Profesores } from '../../stores/profesores';
import { Horarios } from '../../stores/horarios';
import { Asistencia } from '../../stores/asistencia';

const swal = sweetalert();
const profesores = Profesores().profesores;
const cursos = Cursos().cursos;
const horariosStore = Horarios();

const selectedCurso = ref('');
const selectedProfesor = ref('');
const dias = ref([]);
const horaInicio = ref('');
const horaFin = ref('');
const view_form = ref(false);
const form_view = () => {
    view_form.value = !view_form.value;
};
const addHorario = () => {
    const horario = {
        id: horariosStore.horarios.length + 1,
        curso: selectedCurso.value,
        profesor: selectedProfesor.value,
        dias: dias.value,
        horaInicio: horaInicio.value,
        horaFin: horaFin.value,
    };
    if (!horario.curso || !horario.profesor || !horario.dias || !horario.horaInicio || !horario.horaFin) {
        swal.errorAlert('Error al crear horario', 'Por favor, complete todos los campos');
        return;
    }else{
        const response = horariosStore.create(horario);
        console.log(response);
        if (response) {
            swal.successAlert('Horario creado', 'El horario se ha creado correctamente');
            clearForm();
        } else {
            swal.errorAlert('Error al crear horario', 'Ha ocurrido un error al crear el horario');
        }
    }
};

const clearForm = () => {
    selectedCurso.value = '';
    selectedProfesor.value = '';
    dias.value = [];
    horaInicio.value = '';
    horaFin.value = '';
};

const asistenciaStore = Asistencia();

const asis_hor = ref('');
const estado = ref('');


const addAsis = ()=> {
    const newAsis = {
        id: asistenciaStore.asistencias.length + 1,
        horario: asis_hor.value,
        timestamp: new Date().toLocaleString(),
        estado: estado.value,
    };
    console.log(newAsis);
    if (!newAsis.horario || !newAsis.estado) {
        swal.errorAlert('Error al marcar asistencia', 'Por favor, complete todos los campos');
        return;
    }else{
        const response = asistenciaStore.create(newAsis);
        if (response) {
            swal.successAlert('Asistencia marcada', 'La asistencia se ha marcado correctamente');
            clearAsis();
        } else {
            swal.errorAlert('Error al marcar asistencia', 'Ha ocurrido un error al marcar la asistencia');
        }
    }
}

const clearAsis = () => {
    asis_hor.value = '';
    estado.value = '';
};
</script>

<template>
        <Header/>
        <div v-if="view_form" class="vh-60 d-flex flex-column justify-content-center align-items-center">
            <h1>Crear Horario de Clases</h1>
            <button class="btn btn-success mb-3" @click="form_view">Cerrar Formulario</button>
            <div class="container mt-2">
                <div class="row justify-content-center">
                    <div class="col-md-7 col-lg-7">
                        <form class="p-4 border rounded shadow-sm bg-light" @submit.prevent="addHorario">
                            <div class="form-group mb-3">
                                <label for="curso" class="form-label">Curso:</label>
                                <select id="curso" class="form-select" v-model="selectedCurso">
                                    <option v-for="curso in cursos" :key="curso.id" :value="curso.nombre">{{ curso.nombre }}</option>
                                </select>
                            </div>

                            <div class="form-group mb-3">
                                <label for="profesor" class="form-label">Profesor:</label>
                                <select id="profesor" class="form-select" v-model="selectedProfesor">
                                    <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.nombre">{{ profesor.nombre }}</option>
                                </select>
                            </div>

                            <div class="form-group mb-3">
                                <label for="dia" class="form-label">Días:</label>
                                <select id="dia" class="form-select" v-model="dias">
                                    <option value="Lunes">Lunes</option>
                                    <option value="Martes">Martes</option>
                                    <option value="Miércoles">Miércoles</option>
                                    <option value="Jueves">Jueves</option>
                                    <option value="Viernes">Viernes</option>
                                    <option value="Sábado">Sábado</option>
                                    <option value="Domingo">Domingo</option>
                                </select>
                            </div>

                            <div class="form-group mb-3">
                                <label for="horaInicio" class="form-label">Hora de Inicio:</label>
                                <input type="time" id="horaInicio" class="form-control" v-model="horaInicio">
                            </div>

                            <div class="form-group mb-3">
                                <p v-if="horaFin < horaInicio" class="text-danger">La hora de fin debe ser mayor a la hora de inicio</p>
                                <label for="horaFin" class="form-label">Hora de Fin:</label>
                                <input type="time" id="horaFin" class="form-control" v-model="horaFin">
                            </div>

                            <button type="button" class="btn btn-primary w-100" @click="addHorario" :disabled="horaFin < horaInicio">Crear Horario</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="vh-60 d-flex flex-column justify-content-center align-items-center">
        <h1 class="mb-4">Marcar Horarios</h1>
        <button class="btn btn-success mb-3" @click="form_view">Agregar Horario</button>
        <div class="card w-50">
            <div class="card-body">
                <h5 class="card-title">Formulario de Asistencia</h5>
                <form @submit.prevent="addAsis" class="p-4 border rounded shadow-sm bg-light">
                    <div class="form-group mb-3">
                        <label for="horario" class="form-label">Horario:</label>
                        <select v-model="asis_hor" id="horario" class="form-select">
                            <option v-for="horario in horariosStore.horarios" :key="horario?.id" :value="[horario.curso,horario.profesor,horario.horaInicio,horario.horaFin]">
                                {{ horario?.curso }} - {{ horario?.profesor }} - {{ horario?.dias }} - {{ horario?.horaInicio }} - {{ horario?.horaFin }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group mb-3">
                        <label class="form-label">Asistencia:</label>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="falta" v-model="estado" value="Falta">
                            <label class="form-check-label" for="falta">Falta</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="asistido" v-model="estado" value="Asistido">
                            <label class="form-check-label" for="asistido">Asistido</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="atraso" v-model="estado" value="Atraso">
                            <label class="form-check-label" for="atraso">Atraso</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" id="ninguna" v-model="estado" value="">
                            <label class="form-check-label" for="ninguna">Desmarcar Todo</label>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-100" :disabled="estado === ''">Guardar</button>
                </form>
            </div>
        </div>
    </div>
            
</template>
