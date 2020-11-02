import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { showErrorAlert } from 'src/app/app.component';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductService } from 'src/app/service/product/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   productos : ProductoModel[] = [];
   productRemove :ProductoModel= new ProductoModel;
  constructor(private productoService: ProductService,private modalService: NgbModal) { }

  ngOnInit() {
   this.findAll();
  }

  findAll(){
    this.productoService.findAll().subscribe(
      response => {
        this.productos = response;
        console.log(response);
      },
      error => {
        showErrorAlert('Se produjo un error consultando los productos.');
      })
  }

  modalDelete(modal, product: ProductoModel) {
    this.productRemove = product;
    console.log(this.productRemove);
    this.modalService.open(modal, { size: 'sm' });
  }
  delete() {
    this.productoService.delete(this.productRemove).subscribe(
      response => {
        console.log(response);
        this.productRemove = new ProductoModel;
        this.findAll();
        this.modalService.dismissAll();
      },
      error => {
        showErrorAlert('Se produjo un error eliminando este producto.');
      });
  }


}
