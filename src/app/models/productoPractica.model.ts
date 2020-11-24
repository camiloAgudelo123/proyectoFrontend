import { CalendarioPracticaModel } from './calendarioPractica.model';
import { ProductoModel } from './producto.model';

export class ProductoPracticaModel{
    id:number;
    idProductoFk:ProductoModel;
    idCalendarioFk:CalendarioPracticaModel;
    cantidadUtilizada:number;
    constructor(){
        this.idProductoFk = new ProductoModel;
        this.idCalendarioFk = new CalendarioPracticaModel;
    }
}