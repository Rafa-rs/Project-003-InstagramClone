import { animate, state, transition, trigger, style, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner',[
      state('criado', style({
        opacity:1
      })),
      //void estado reservado pelo angular "elemento não existe na árvore do DOM"
      transition('void => criado', [
        style({ opacity:0 , transform: 'translate(-50px, 0)'}),
        //'duração, delay e aceleração'
        animate('500ms 0s ease-in-out') 
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity:1
      })),
      transition('void => criado', [
        style({opacity:0 , transform: 'translate(50px, 0)'}),
        //'duração, delay e aceleração', keyframes
        animate('2500ms 0s ease-in-out', keyframes([
          //offset= % da duração
          style({offset:0.05, opacity:0.25, transform:'translateY(-10px)'}),
          style({offset:0.25, opacity:0.50, transform:'translateY(10px)'}),
          style({offset:0.5, opacity:0.60, transform:'translateY(-10px)'}),
          style({offset:0.75, opacity:0.90, transform:'translateY(10px)'}),
          style({offset:0.95, opacity:1, transform:'translateY(-10px)'}),

        ])) 
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoPainel: string = 'criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  public exibirPainel(event:string): void{

    this.cadastro = event === 'cadastro' ? true : false
  }

  public inicioAnimacao():void{
    console.log('Inicio da animação')
  }
  
  public fimAnimacao():void{
    console.log('fim da animação')
  }
}
