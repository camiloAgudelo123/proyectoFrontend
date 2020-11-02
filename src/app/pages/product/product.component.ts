import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product/product.service';
import { RiesgoQuimicoModel } from 'src/app/models/riesgoQuimico.model';
import { RiesgoQuimicoService } from 'src/app/service/riesgoQuimico/riesgo-quimico.service';
import { showErrorAlert } from 'src/app/app.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();
  riesgoQuimico: RiesgoQuimicoModel = new RiesgoQuimicoModel;

  constructor(private productoService: ProductService,private riesgosQuimicosService:RiesgoQuimicoService) { }

  ngOnInit() {
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
