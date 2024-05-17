import { defineStore } from 'pinia'
export const Profesores = defineStore('profesorStore',{
    state: ()=>(
        {
            profesores:[],
        }
    ),
    actions:{
        async create(formdata){
            console.log(formdata)
            this.profesores.push(formdata)
            console.log(this.profesores)
            return true
        },
        async delete(id){
            console.log(id)
            this.profesores = this.profesores.filter(profesor => profesor.id != id)
            console.log(this.profesores)
            return true
        }
    },



})