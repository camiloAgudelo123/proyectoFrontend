import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product/product.service';
import { RiesgoQuimicoModel } from 'src/app/models/riesgoQuimico.model';
import { RiesgoQuimicoService } from 'src/app/service/riesgoQuimico/riesgo-quimico.service';
import { showErrorAlert } from 'src/app/app.component';
import { SgaAmbientalModel } from 'src/app/models/sgaambiental.model';
import { SgaAmbientalService } from 'src/app/service/sgaAmbiental/sga-ambiental.service';
import { PeligrosidadNTCModel } from 'src/app/models/peligrosidadNTC.model';
import { PeligrosidadNtcService } from 'src/app/service/peligrosidadNtc/peligrosidad-ntc.service';
import { ProductoPracticaService } from 'src/app/service/productoPractica/producto-practica.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();
  riesgoQuimico: RiesgoQuimicoModel = new RiesgoQuimicoModel;
  sgaAmbiental:SgaAmbientalModel[] =[]; 
  peligrosidadNTC:PeligrosidadNTCModel[] =[]; 

  constructor(private productoService: ProductService,private riesgosQuimicosService:RiesgoQuimicoService,private sgaAmbientalService:SgaAmbientalService,
    private peligrosidadNTCService:PeligrosidadNtcService) { }

  ngOnInit() {
    this.sgaAmbientalService.findAll().subscribe(
      response => {
       this.sgaAmbiental = response;
      },
      error => {
        showErrorAlert('Se produjo un error creando los SGA ambientales.');
      });
    this.peligrosidadNTCService.findAll().subscribe(
      response => {
       this.peligrosidadNTC = response;
      },
      error => {
        showErrorAlert('Se produjo un error creando la peligrosidad NTC.');
      });
  }
  save(form: NgForm) {
    if (form.valid) {
      this.productoService.save(this.producto).subscribe(
        response => {
          console.log(response);
          let responseObj: any = response;
          this.riesgoQuimico.idProductoFk.idProducto = responseObj.idProducto;
          this.guardarRiesgoQuimico();
          console.log("------Riesgo Quimico----");
          console.log(this.riesgoQuimico);
          //this.usuario = new UsuarioModel;
        },
        error => {
          showErrorAlert('Se produjo un error creando el producto.');
        });
    } else {
      alert("Formulario no válido.")
    }
  }

  guardarRiesgoQuimico() {
    this.riesgosQuimicosService.save(this.riesgoQuimico).subscribe(
      response => {
        alert("registrado");
      },
      error => {
        showErrorAlert('Se produjo un error creando los riesgos quimicos.');
      });
  }


}
