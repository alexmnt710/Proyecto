import { defineStore } from 'pinia'
export const Cursos = defineStore('cursoStore',{
    state: ()=>(
        {
            cursos:[],
            facultades:[
                {id:1, nombre:'Ingenieria en Sistemas'},
                {id:2, nombre:'Ciencias'},
                {id:3, nombre:'Humanidades'},
                {id:4, nombre:'Educacion'},
                {id:5, nombre:'Economia'},
                {id:6, nombre:'Medicina'},
                {id:7, nombre:'Odontologia'},
                {id:8, nombre:'Veterinaria'},
                {id:9, nombre:'Derecho'},
            ]
        }
    ),
    actions:{
        async create(formdata){
            console.log(formdata)
            this.cursos.push(formdata)
            console.log(this.cursos)
            return true
        },
        async delete(id){
            console.log(id)
            this.cursos = this.cursos.filter(curso => curso.id != id)
            console.log(this.cursos)
            return true
        }
    },



})