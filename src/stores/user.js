import { defineStore } from 'pinia'
export const User = defineStore('userStore',{
    state: ()=>(
        {
            user:[],
            admin:[
                {
                    nombre : 'admin',
                    type : 'admin',
                    email : 'admin@gmail.com',
                    password: 'admin',
                }
            ],
            sessionAdmin: false,
        }
    ),
    actions:{
        async login(user,pass){
            console.log(this.admin[0].nombre,this.admin[0].password)
            console.log(user,pass)
            if((user == this.admin[0].nombre && pass == this.admin[0].password)){
                this.sessionAdmin = true
                return true
            }else if(user == this.admin[0].correo && pass == this.admin[0].password){
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
        },
        async findWithUser(user) {
            const userEncontrado = this.admin.find(a => a.email === user || a.nombre === user);
            return userEncontrado ? [true, userEncontrado] : [false];
        },
        async cambioPassword(pass){
            this.admin[0].password = pass
            return true
        }
    },


})
