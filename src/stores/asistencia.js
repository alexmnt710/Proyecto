import { defineStore } from 'pinia'
export const Asistencia = defineStore('asistenciaStore',{
    state: ()=>(
        {
            asistencias:[],
        }
    ),
    actions:{
        async create(asistencia){
            this.asistencias.push(asistencia)
            return true
        },
        async delete(asistencia){
            this.asistencias = this.asistencias.filter(a => a.id !== asistencia.id)
        },
        async update(asistencia){
            const index = this.asistencias.findIndex(a => a.id === asistencia.id)
            this.asistencias[index] = asistencia
        }
    }
})