import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { showErrorAlert } from 'src/app/app.component';
import { LaboratorioModel } from 'src/app/models/laboratorio.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { LaboratorioService } from 'src/app/service/laboratorio/laboratorio.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';


@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {
  coordinadores: UsuarioModel[] = [];
  laboratorio = new LaboratorioModel;
  laboratorios: LaboratorioModel[] = [];
  laboratorioUpdate: LaboratorioModel;
  laboratorioDelete: LaboratorioModel;
  constructor(private laboratorioService: LaboratorioService, private usuarioService: UsuarioService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(
      response => {
        this.coordinadores = response;
      },
      error => {
        showErrorAlert('Se produjo un error consultando los coordinadores.');
      }
    );
    this.findAll();
  }

  findAll() {
    this.laboratorioService.findAll().subscribe(
      response => {
        this.laboratorios = response;
      },
      error => {
        showErrorAlert('Se produjo un error consultando los laboratorios.');
      });
  }

  save(form: NgForm) {
    if (form.valid) {
      this.laboratorioService.save(this.laboratorio).subscribe(
        response => {
          this.laboratorio = new LaboratorioModel;
          this.findAll();
        },
        error => {
          showErrorAlert('Se produjo un error creando el laboratorio.');
        }
      );
    } else {
      showErrorAlert("Por favor valida la información del formulario.");
    }

  }

  viewUpdate(modal,id:number) {
    const dataUpdate = Object.assign({}, this.laboratorios[id]);
    this.laboratorioUpdate = dataUpdate;
    console.log(this.laboratorioUpdate);
    this.modalService.open(modal);
  }

  update(form: NgForm) {
    if (form.valid) {
      this.laboratorioService.update(this.laboratorioUpdate).subscribe(
        response => {
          console.log(response);
          this.laboratorioUpdate = new LaboratorioModel;
          this.findAll();
          this.modalService.dismissAll();
        },
        error => {
          showErrorAlert('Se produjo un error modificando el laboratorio.');
        });
    } else {
      alert("Formulario no válido.");
    }
  }
  modalDelete(modal,laboratorio:LaboratorioModel) {
    this.laboratorioDelete = laboratorio;
    console.log(this.laboratorioDelete);
    this.modalService.open(modal, { size: 'sm' });
  }

  delete() {
    this.laboratorioService.delete(this.laboratorioDelete).subscribe(
      response => {
        console.log(response);
        this.laboratorioDelete = new LaboratorioModel;
        this.findAll();
        this.modalService.dismissAll();
      },
      error => {
        showErrorAlert('Se produjo un error eliminando este laboratorio.');
      });
  }
}
