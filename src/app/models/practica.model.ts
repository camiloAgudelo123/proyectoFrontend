import { LaboratorioModel } from './laboratorio.model';
import { UsuarioModel } from './usuario.model';

export class PracticaModel{
    fechaPractica:string;
    horaInicio:string;
    horaFin:string;
    idUsuario:UsuarioModel;
    idLaboratorio:LaboratorioModel;
    constructor(){
        this.idUsuario = new UsuarioModel;
        this.idLaboratorio = new LaboratorioModel;
    }
    
}