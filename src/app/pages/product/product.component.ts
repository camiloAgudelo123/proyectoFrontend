import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product/product.service';
import { RiesgoQuimicoModel } from 'src/app/models/riesgoQuimico.model';
import { RiesgoQuimicoService } from 'src/app/service/riesgoQuimico/riesgo-quimico.service';
import { showErrorAlert } from 'src/app/app.component';
import { SgaAmbientalModel } from 'src/app/models/sgaambiental.model';
import { SgaService } from 'src/app/service/sgaAmbiental/sga.service';
import { PeligrosidadNTCModel } from 'src/app/models/peligrosidadNTC.model';
import { PeligrosidadNtcService } from 'src/app/service/peligrosidadNtc/peligrosidad-ntc.service';
import { ProductoPracticaService } from 'src/app/service/productoPractica/producto-practica.service';
import { RiesgoQuimicoPeligroService } from 'src/app/service/riesgoQuimicoPeligro/riesgo-quimico-peligro.service';
import { RiesgoQuimicoPeligroModel } from 'src/app/models/riesgoQuimicoPeligro.model';
import { SgaFisicoModel } from 'src/app/models/sgafisico.model';
import { SgaSaludModel } from 'src/app/models/sgasalud.model';
import { idText } from 'typescript';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();
  riesgoQuimico: RiesgoQuimicoModel = new RiesgoQuimicoModel;
  peligrosidadNTC: PeligrosidadNTCModel[] = [];
  riesgoQuimicoPeligro1 = new RiesgoQuimicoPeligroModel;
  riesgoQuimicoPeligro2 = new RiesgoQuimicoPeligroModel;
  riesgoQuimicoPeligro3 = new RiesgoQuimicoPeligroModel;
  sgaAmbiental: SgaAmbientalModel[] = [];
  sgaFisico: SgaFisicoModel[] = [];
  sgaSalud: SgaSaludModel[] = [];
  sgaFisicoSeleccionado: Array<any> = [];
  constructor(private productoService: ProductService, private riesgosQuimicosService: RiesgoQuimicoService, private sgaService: SgaService,
    private peligrosidadNTCService: PeligrosidadNtcService, private riesgoQuimicoPeligroService: RiesgoQuimicoPeligroService) { }

  ngOnInit() {
    this.sgaService.findAll('sgaambiental').subscribe(
      response => {
        this.sgaAmbiental = response;
      },
      error => {
        showErrorAlert('Se produjo un error creando los SGA ambientales.');
      });
    this.sgaService.findAll('sgafisico').subscribe(
      response => {
        this.sgaFisico = response;
      },
      error => {
        showErrorAlert('Se produjo un error creando los SGA fisicos.');
      });
    this.sgaService.findAll('sgasalud').subscribe(
      response => {
        this.sgaSalud = response;
      },
      error => {
        showErrorAlert('Se produjo un error creando los SGA salud.');
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
        let riesgoObj: any = response;
        this.riesgoQuimicoPeligro1.fkRiesgo = riesgoObj.idRiesgo;
        this.riesgoQuimicoPeligro2.fkRiesgo = riesgoObj.idRiesgo;
        this.riesgoQuimicoPeligro3.fkRiesgo = riesgoObj.idRiesgo;
        this.guardarRiesgoQuimicoPeligros();
        alert("registrado riesgos quimico");
      },
      error => {
        showErrorAlert('Se produjo un error creando los riesgos quimicos.');
      });
  }
  guardarRiesgoQuimicoPeligros() {
    this.riesgoQuimicoPeligroService.save(this.riesgoQuimicoPeligro1).subscribe(
      response => {
        alert("registrado riesquimico peligros");
      },
      error => {
        showErrorAlert('Se produjo un error creando los peligros quimicos.');
      });
    this.riesgoQuimicoPeligroService.save(this.riesgoQuimicoPeligro2).subscribe(
      response => {
        alert("registrado riesquimico peligros");
      },
      error => {
        showErrorAlert('Se produjo un error creando los peligros quimicos.');
      });
    this.riesgoQuimicoPeligroService.save(this.riesgoQuimicoPeligro3).subscribe(
      response => {
        alert("registrado riesquimico peligros");
      },
      error => {
        showErrorAlert('Se produjo un error creando los peligros quimicos.');
      });
  }

  crearSgaFisico(id) {
    console.log(id);
    if (this.sgaFisicoSeleccionado.includes(id)) {
      this.sgaFisicoSeleccionado = this.removeItemFromArr(this.sgaFisicoSeleccionado,id);
    }else{
      this.sgaFisicoSeleccionado.push(id);
    }
    console.log(this.sgaFisicoSeleccionado);
  }
  crearSgaSalud(id) {
    console.log(id);
  }
  removeItemFromArr(arr, item) {
    return arr.filter(function (e) {
      return e !== item;
    });
  };
}
