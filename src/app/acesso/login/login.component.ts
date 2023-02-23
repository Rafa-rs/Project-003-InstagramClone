import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
//import { Autenticacao } from 'src/app/autenticacao.service';
import { AutenticacaoProjeto } from 'src/app/autenticacao-projeto.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter()

  constructor(
    //private autenticacao: Autenticacao
    private autenticacao: AutenticacaoProjeto
  ) { }

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void{
  
    this.exibirPainel.emit('cadastro')

  }

  public autenticar(): void{
    //console.log(this.formulario)
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
  }
}
