import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Bd } from 'src/app/bd.service';
import * as firebase from '@firebase/app'
import { getDatabase, ref, set } from "@firebase/database"
import { getAuth } from "@firebase/auth"

import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email!: string
  private image: any 
  
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload!: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),

  })

  constructor(
    private bd:Bd,
    private progresso:Progresso
  ) { }

  ngOnInit(): void {

    const auth= getAuth();
    auth.onAuthStateChanged((user:any)=>{
      this.email = user.email
      //console.log('email user atual: ',this.email)
    })

  }

  public publicar():void{
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.image[0]
    })

    let acompUpLoad= interval(1000)

    // o subject serve para submeter valores para o observable
    let continua= new Subject()

    continua.next(true)

    acompUpLoad
      .pipe(
        takeUntil(continua)
      )
      .subscribe(()=> {
        //console.log(this.progresso.status)
        //console.log(this.progresso.estado)
        this.progressoPublicacao= 'andamento'
        this.porcentagemUpload= Math.round((this.progresso.porcentagem))
        
        if(this.progresso.status === 'concluido'){
          this.progressoPublicacao= 'concluido'

          //emitir um evento do componente parent (home)
          this.atualizarTimeLine.emit()
          
          continua.next(false)
        }
      })
      
  }

  public preparaImagemUpload(event:Event): void{
    this.image = (<HTMLInputElement>event.target).files
  }
}
