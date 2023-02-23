import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations'

import { Imagem } from './image.moodel';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner',[
      state('escondido',style({
        opacity:0
      })),
      state('visivel', style({
        opacity:1
      })),
      transition('escondido => visivel', animate('2s ease-in')),
      transition('visivel => escondido', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  //variavel que controla a trigger
  public estado: string = 'escondido'

  public imagens: Imagem[] = [
    {estado:'visivel', url:'/assets/banner-acesso/img_1.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_2.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_3.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_4.png'},
    {estado:'escondido', url:'/assets/banner-acesso/img_5.png'},
  ]

  constructor() { }

  ngOnInit(): void {
    //console.log(this.imagens)

    setTimeout(()=> this.logicaRotacao(), 2000)
        
  }

  public logicaRotacao(): void{
    //console.log(this.imagens)
    
    //variavel que auxilia na exibição da imagem seguinte
    let idx!:number

    //ocultar imagem
    for(let i:number= 0; i <= 4; i++){

      if(this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido'
        

        //se i = 4 então 0, caso contrario i+1
        idx= i === 4 ? 0 : i + 1

        break

      }
    }

    //exiber outra
    this.imagens[idx].estado = 'visivel'

    setTimeout(()=> this.logicaRotacao(), 2000)
  }

  /*
  public toggleEstado(): void{
    this.estado = this.estado === 'visivel' ? 'escondido' : 'visivel'
  }
  */
  


}
