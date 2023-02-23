import { Usuario } from "./acesso/usuario.model";

import * as firebase from '@firebase/app'

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"

import { getDatabase, ref, set } from "@firebase/database"


export class Autenticacao {

    public cadastrarUsuario(usuario:Usuario): void {
        console.log('Serviço: ', usuario)
        
        //retirar erro do buffer requirido
        window.Buffer = window.Buffer || require('buffer').Buffer
        
        // --- inicializar firebase ---
        const firebaseConfig = {
            apiKey: "AIzaSyApD4r3VZWagXc4cNPUjswicgoaMuG5I8E",
            authDomain: "jta-instagram-clone-a06c7.firebaseapp.com",
            projectId: "jta-instagram-clone-a06c7",
            storageBucket: "jta-instagram-clone-a06c7.appspot.com",
            messagingSenderId: "230285212098",
            appId: "1:230285212098:web:efa858ae420d326da0be5b",
            measurementId: "G-F5QF6NKJM6",
            databaseURL: "https://jta-instagram-clone-a06c7-default-rtdb.firebaseio.com"
        }

        // instanciar configuração
        const app= firebase.initializeApp(firebaseConfig)

        // --- instanciar Realtime
        const dataBase= getDatabase()

        // --- instanciar autenticação de usuários ---
        const auth = getAuth(app)

        // --- criar usuário ---
        createUserWithEmailAndPassword(auth, usuario.email, usuario.senha)
            .then((resposta:any)=>{ 
                //console.log(resposta)

                // --- remover a senha do atributo ---
                usuario.senha = ''
                //delete (usuario.senha)
                
                // --- registrando dados complementares do usuário no path email na base64 ---
                set(ref(dataBase,`usuario_detalhe/${Buffer.from(usuario.email).toString('base64')}`), usuario)
                    .then((retorno:any)=> {
                        console.log('Inclusão OK! : ', retorno)
                        
                    })
                    .catch((erro:Error)=> console.log('Algo deu errado: ', erro))
               
            })
            .catch((erro:Error)=> {
                console.log('Falha na Autenticação do usuário: ', erro)
            })
    }

    public autenticar(): void{
        //const dataBase= getDatabase()
        //const auth = getAuth(app)
        //signInWithEmailAndPassword()
        
    }
}