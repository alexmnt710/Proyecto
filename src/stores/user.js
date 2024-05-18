import { defineStore } from 'pinia'
export const User = defineStore('userStore',{
    state: ()=>(
        {
            user:[],
            admin:[],
            sessionAdmin: false,
        }
    ),
    actions:{
        async login(user,pass){
            console.log(this.admin)
            if((user == this.admin.nombre && pass == this.admin.password)){
                this.sessionAdmin = true
                return true
            }else if(user == this.user.correo && pass == this.user.password){
                this.sessionAdmin = true
                return true
            }
            else{
                this.sessionAdmin = false
                return false
            }  
        },
        async logout(){
            this.sessionAdmin = false
            return true
        }
    },


})
