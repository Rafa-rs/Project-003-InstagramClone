import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import {getAuth, onAuthStateChanged } from '@firebase/auth'

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email!: string
  public publicacoes: any

  constructor(private bd:Bd) { }

  ngOnInit(): void {

    const auth= getAuth()
    onAuthStateChanged(auth, (user:any) => {
      this.email = user.email
      this.atualizarTimeLine()
    })
    
    
  }


  public atualizarTimeLine():void{
    
    this.bd.consultaPublicacoes(this.email)
    .then((publicacoes:any) => {

      this.publicacoes = publicacoes

      console.log(this.publicacoes)

    })

  }
}
