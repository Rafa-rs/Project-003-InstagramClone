import { CanActivate } from "@angular/router";

import { Injectable } from "@angular/core";
import { AutenticacaoProjeto } from "./autenticacao-projeto.service";


@Injectable()
export class AutenticacaoGuard implements CanActivate{
    
    constructor(private autenticacao: AutenticacaoProjeto){}
    
    canActivate(): boolean {
        return this.autenticacao.autenticado()
    }
}