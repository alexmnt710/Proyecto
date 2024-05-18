import { defineStore } from 'pinia'

export const Horarios = defineStore('horariosStore',{
    state: ()=>(
        {
            horarios:[],
        }
    ),
    actions:{
        async create(horario){
            this.horarios.push(horario)
            return true
        },
        async delete(horario){
            this.horarios = this.horarios.filter(h => h.id !== horario.id)
        },
        async update(horario){
            const index = this.horarios.findIndex(h => h.id === horario.id)
            this.horarios[index] = horario
        }
    }
})