export class RiesgoQuimicoPeligroModel{
    id:number;
    fkRiesgo:number;
    fkPeligro:number;
    constructor(){
        this.fkPeligro = 6;
    }
}