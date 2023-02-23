//injetar outro serviço
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from '@firebase/app'
import { getDatabase, ref, set } from "@firebase/database"

import { Usuario } from "./acesso/usuario.model";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@firebase/auth"

@Injectable()
export class AutenticacaoProjeto {

    public token_id!: String

    constructor(private router: Router){}

    // --- inicializar firebase ---
    public firebaseConfig = {
        apiKey: "AIzaSyApD4r3VZWagXc4cNPUjswicgoaMuG5I8E",
        authDomain: "jta-instagram-clone-a06c7.firebaseapp.com",
        projectId: "jta-instagram-clone-a06c7",
        storageBucket: "jta-instagram-clone-a06c7.appspot.com",
        messagingSenderId: "230285212098",
        appId: "1:230285212098:web:efa858ae420d326da0be5b",
        measurementId: "G-F5QF6NKJM6",
        databaseURL: "https://jta-instagram-clone-a06c7-default-rtdb.firebaseio.com"
    }

    
    // --- instanciar configuração
    public app = firebase.initializeApp(this.firebaseConfig)
    
    // --- instanciar Realtime
    public dataBase= getDatabase()

    // --- método para cadastrar usuário
    public cadastrarUsuario(usuario:Usuario): Promise<any>{
        
        //retirar erro do buffer requirido
        window.Buffer = window.Buffer || require('buffer').Buffer

        // --- instanciar autenticação de usuários ---
        const auth = getAuth(this.app)

        return createUserWithEmailAndPassword(auth, usuario.email, usuario.senha)
            .then((resposta:any)=>{ 
                //console.log(resposta)

                // --- remover a senha do atributo ---
                usuario.senha = ''
                //delete (usuario.senha)
                
                // --- registrando dados complementares do usuário no path email na base64 ---
                set(ref(this.dataBase,`usuario_detalhe/${Buffer.from(usuario.email).toString('base64')}`), usuario)
                    .then((retorno:any)=> {
                        console.log('Inclusão OK! : ', retorno)
                        
                    })
                    .catch((erro:Error)=> console.log('Algo deu errado: ', erro))
               
            })
            .catch((erro:Error)=> {
                console.log('Falha na Autenticação do usuário: ', erro)
            })
    }

    public autenticar(email:string, senha:string): void{
        // --- instanciar autenticação de usuários ---
        const auth = getAuth(this.app)

        //console.log('email: ',email)
        //console.log('senha: ',senha)

        // --- autenticar e pegar o token de autenticação
        signInWithEmailAndPassword(auth, email, senha)
            .then((resposta:any) => {
                auth.currentUser?.getIdToken()
                    .then((idToken:string) => {
                        //recuperar o token
                        this.token_id = idToken
                        
                        // armazezar no localStorage para não perder durante um refresh
                        localStorage.setItem('idToken', idToken)
                        
                        //navegar até a página
                        this.router.navigate( ['/home'] )
                    })
            })
            .catch((erro:Error) => console.log(erro))
    }

    //controlar o canActivate
    public autenticado(): boolean {
        
        //verificar se existe token armazenado
        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken')!
        }

        if(this.token_id === undefined){
            this.router.navigate( ['/'] )
        }

        // retornar true de for diferente de undefined, e false se for igual a undefined
        return this.token_id !== undefined
       
    }

    public sair():void{
        const auth = getAuth(this.app)
        
        signOut(auth)
            .then( () => {
                localStorage.removeItem('idToken')
                this.token_id = undefined!
                this.router.navigate( ['/'] )

            })
        
    }
}


