<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import {Cursos} from '../../stores/cursos';
import Header from '../header.vue';
import { onMounted } from 'vue';

const swal = sweetalert();
const router = useRouter()
const cursoStore = Cursos();

const nombre = ref('');
const descripcion = ref('');
const numeroEstudiantes = ref('');
const facultad = ref('');


const addCourse = () => {
  const newCourse = {
    id: cursoStore.cursos.value.length + 1,
    nombre: nombre.value,
    descripcion: descripcion.value,
    numeroEstudiantes: numeroEstudiantes.value,
    facultad: facultad.value,
  };
  if (!newCourse.nombre || !newCourse.descripcion || !newCourse.numeroEstudiantes || !newCourse.facultad) {
    swal.errorAlert('Error al crear curso', 'Por favor, complete todos los campos');
    return;
  }else{
    const response = cursoStore.create(newCourse);
    if (response) {
      swal.successAlert('Curso creado', 'El curso se ha creado correctamente');
      clearForm();
    } else {
      swal.errorAlert('Error al crear curso', 'Ha ocurrido un error al crear el curso');
    }
  }
};

const clearForm = () => {
  nombre.value = '';
  descripcion.value = '';
  numeroEstudiantes.value = '';
  facultad.value = '';
};


const deleteCourse = async (id) => {
  const isConfirmed = await swal.confirmAlert('Eliminar curso', '¿Estás seguro de eliminar este curso?');
  if (isConfirmed) {
      const response = cursoStore.delete(id);
      if (response) {
        swal.successAlert('Curso eliminado', 'El curso se ha eliminado correctamente');
      } else {
        swal.errorAlert('Error al eliminar curso', 'Ha ocurrido un error al eliminar el curso');
      }
  } else {
      console.log('Acción de eliminación cancelada');
  }
};
const viewCourse = (nombre,descripcion,numeroEstudiantes,facultad) => {
  swal.showAlert(nombre, descripcion+` cuenta con `+numeroEstudiantes+` estudiantes y pertenece a la `+facultad,);
};

</script>
<template>
    <Header></Header>
    <div class="container vh-99 d-flex justify-content-center align-items-center">
        
      <div class="row w-100">
        <div class="col-md-6">
          <h3>Crear Curso</h3>
          <form @submit.prevent="addCourse">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" id="nombre" class="form-control" v-model="nombre" required />
            </div>
            <div class="mb-3">
              <label for="descripcion" class="form-label">Descripción</label>
              <textarea id="descripcion" class="form-control" v-model="descripcion" required></textarea>
            </div>
            <div class="mb-3">
              <label for="numeroEstudiantes" class="form-label">Número de estudiantes</label>
              <input type="number" id="numeroEstudiantes" class="form-control" v-model="numeroEstudiantes" required />
            </div>
            <div class="mb-3">
              <select id="facultad" class="form-select" v-model="facultad" required>
                <option value="" disabled selected>Selecciona una facultad</option>
                <option v-for="facultad in cursoStore.facultades" :key="facultad.id" :value="facultad.nombre">{{ facultad.nombre }}</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Agregar Curso</button>
          </form>
        </div>
        <div class="col-md-6">
          <h3>Lista de Cursos</h3>
          <ul class="list-group">
            <li v-for="curso in cursoStore.cursos" :key="curso.id" class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{{ curso.id }}: {{ curso.nombre }}</h5>
                <p>{{ curso.descripcion }}</p>
              </div>
              <div>
                <button @click="deleteCourse(curso.id)" class="btn btn-danger btn-sm me-2">Eliminar</button>
                <button @click="viewCourse(curso.nombre, curso.descripcion, curso.numeroEstudiantes,curso.facultad)" class="btn btn-info btn-sm">Ver</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>

<style scoped>

</style>