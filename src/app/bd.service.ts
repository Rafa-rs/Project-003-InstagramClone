import { Injectable } from "@angular/core"

import { getDatabase, ref, set, push, child, onValue, query, orderByKey } from "@firebase/database"
import { getStorage, ref as ref2, uploadBytes, uploadBytesResumable, getDownloadURL} from "@firebase/storage"
import { AnonymousSubject } from "rxjs/internal/Subject"

import { Progresso } from "./progresso.service"

@Injectable()
export class Bd {

    constructor(private progresso: Progresso){}
    
    public publicar(publicacao:any): void {

        //console.log(publicacao)
        //console.log("Chegamos até o serviço")

        window.Buffer = window.Buffer || require('buffer').Buffer

        const dataBase= getDatabase()
               
        const storage = getStorage()

             
        
        //transformando any em string, para converter am base 64
        let email:string = publicacao.email

        //publicando no  Realtime database
        push(ref(dataBase,`publicacoes/${Buffer.from(email).toString('base64')}`), {titulo: publicacao.titulo})
            .then((resultado)=>{
                let nomeImagem = resultado.key
                const refStorage = ref2(storage, `imagens/${nomeImagem}`)

                //fazendo upload da imagem no Storage
                const uploadTask= uploadBytesResumable(refStorage, publicacao.imagem)
                uploadTask.on('state_changed',
                    (snapshot) => {

                        const progress= (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('UpLoad está pausado!')
                                break;
                        
                            case 'running':
                                console.log('UpLoad está em andamento!')
                                this.progresso.status= 'andamento'
                                break;
                        }

                        
                        this.progresso.estado= snapshot
                        this.progresso.porcentagem= progress
                    },
                    (erro:Error) => {
                        console.log(erro)

                        this.progresso.status= 'erro'
                    },
                    () => {
                        console.log('UpLoad CONCLUÍDO !!!')

                        this.progresso.status= 'concluido'
                    }
            
                )

            })

      

    }

    public consultaPublicacoes(emailUsuario:string):Promise<any> {

        return new Promise((resolve, reject) => {

            window.Buffer = window.Buffer || require('buffer').Buffer

        
            //Consultar as publicações (database)
            const dataBase= getDatabase()
            
            const refPublicacoes= query(ref(dataBase,`publicacoes/${Buffer.from(emailUsuario).toString('base64')}`), orderByKey())

            onValue(refPublicacoes, 
            (snapshot) => {
                console.log(snapshot.val())
                            
                let publicacoes: Array<any> = []

                //percorrer array
                snapshot.forEach((childSnapshot:any) => {

                    let publicacao = childSnapshot.val()

                    //consultar a url da imagem (storage)
                    const storage = getStorage()
                    const refStorage = ref2(storage, `imagens/${childSnapshot.key}`)
                    getDownloadURL(refStorage)
                    .then((url:string)=>{
                        
                        //incluindo atributo url_imagem
                        publicacao.url_imagem = url

                        //consultar o nome do usuario
                        onValue(ref(dataBase,`usuario_detalhe/${Buffer.from(emailUsuario).toString('base64')}`),
                        (snapshot) => {
                            publicacao.nome_usuario = snapshot.val().nomeUsuario

                            publicacoes.push(publicacao)
                        })

                        

                    })
                })

                resolve(publicacoes)

            },{
                onlyOnce:true
            })

        })

        
         

    }
}