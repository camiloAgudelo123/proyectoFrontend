export class ProductoModel{
    idProducto:number;
    nombre:string;
    descripcion:string;
    cantidad:number;
    estado:string;
    composicionQuimica:string;
    color:string;
    olor:string;
    ph:string;
    puntoInflamacion:string;
    fabricante:string;
    numeroFabricante:number;
    paginaFabricante:string;
    constructor(){
        this.nombre = "Cloro";
        this.descripcion = "Quimico inoloro";
        this.cantidad = 10;
        this.estado = "activo";
        this.composicionQuimica = "N/A";
        this.color = "blanco";
        this.olor = "N/A";
        this.ph = "1.2";
        this.puntoInflamacion = "1.2";
        this.fabricante = "cloro SA";
        this.numeroFabricante = 323323333322;
        this.paginaFabricante = "https://cloro.com.co";
    }
}