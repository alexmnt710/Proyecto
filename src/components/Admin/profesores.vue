<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import {Cursos} from '../../stores/cursos';
import {Profesores} from '../../stores/profesores';
import Header from '../header.vue';
import { onMounted } from 'vue';

const swal = sweetalert();
const router = useRouter()
const cursoStore = Cursos();
const profesorStore = Profesores();

const nombre = ref('');
const titulo = ref('');
const materia = ref('');
const curso = ref('');

const addprofesor = () => {
  const newProfesor = {
    id: profesorStore.profesores.value.length + 1,
    nombre: nombre.value,
    titulo: titulo.value,
    materia: materia.value,
    curso: curso.value,
  };
  if (!newProfesor.nombre || !newProfesor.titulo || !newProfesor.materia || !newProfesor.curso) {
    swal.errorAlert('Error al crear profesor', 'Por favor, complete todos los campos');
    return;
  }else{
    const response = profesorStore.create(newProfesor);
    if (response) {
      swal.successAlert('Profesor creado', 'El profesor se ha creado correctamente');
      clearForm();
    } else {
      swal.errorAlert('Error al crear profesor', 'Ha ocurrido un error al crear el profesor');
    }
  }
};

const clearForm = () => {
  nombre.value = '';
    titulo.value = '';
    materia.value = '';
    curso.value = '';
};


const deleteProfesor = async (id) => {
  const isConfirmed = await swal.confirmAlert('Eliminar profesor', '¿Estás seguro de eliminar este profesor?');
  if (isConfirmed) {
      const response = profesorStore.delete(id);
      if (response) {
        swal.successAlert('Profesor eliminado', 'El profesor se ha eliminado correctamente');
      } else {
        swal.errorAlert('Error al eliminar profesor', 'Ha ocurrido un error al eliminar el profesor');
      }
  }
};
const viewProfesor = (nombre,titulo,materia,curso) => {
    swal.showAlert('Información del profesor', `Profesor ${nombre} con el titulo ${titulo} imparte la materia de ${materia} en el curso de ${curso}`);
};

</script>
<template>
    <Header></Header>
    <div class="container vh-99 d-flex justify-content-center align-items-center">
        
      <div class="row w-100" v-if="cursoStore.cursos.length!=0">
        <div class="col-md-6">
          <h3>Crear usuarios Profesores</h3>
          <form @submit.prevent="addprofesor">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" v-model="nombre" required />
            </div>
            <div class="mb-3">
              <label for="titulo" class="form-label">Titulo</label>
              <textarea class="form-control" v-model="titulo" required></textarea>
            </div>
            <div class="mb-3">
                <label for="materia" class="form-label">Materia</label>
                <textarea class="form-control" v-model="materia" required></textarea>
              </div>
            <div class="mb-3">
              <select class="form-select" v-model="curso" required>
                <option value="" disabled selected>Selecciona un curso</option>
                <option v-for="curso in cursoStore.cursos" :key="curso.id" :value="curso.nombre">{{ curso.nombre }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Agregar Profesor</button>
          </form>
        </div>
        <div class="col-md-6">
          <h3>Lista de Profesores</h3>
          <ul class="list-group">
            <li v-for="profesor in profesorStore.profesores" :key="profesor.id" class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{{ profesor.id }}: {{ profesor.nombre }}</h5>
                <p>{{ profesor.materia }}</p>
              </div>
              <div>
                <button @click="deleteProfesor(profesor.id)" class="btn btn-danger btn-sm me-2">Eliminar</button>
                <button @click="viewProfesor(profesor.nombre, profesor.titulo, profesor.materia,profesor.curso)" class="btn btn-info btn-sm">Ver</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
        <div v-else>
            <h1>No hay cursos disponibles, por favor cree uno antes de crear un profesor</h1>
        </div>
    </div>
  </template>

<style scoped>

</style>