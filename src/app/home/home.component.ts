import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoProjeto } from '../autenticacao-projeto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes:any

  constructor(
    private autenticacao: AutenticacaoProjeto
  ) { }

  ngOnInit(): void {
  }

  public sair():void{
    this.autenticacao.sair()
  }

  public atualizarTimeLine(): void{
    this.publicacoes.atualizarTimeLine()
  }
}
