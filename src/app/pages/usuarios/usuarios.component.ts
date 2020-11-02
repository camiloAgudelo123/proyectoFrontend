import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LaboratorioService } from 'src/app/service/laboratorio/laboratorio.service';
import { LaboratorioModel } from 'src/app/models/laboratorio.model';
import { showErrorAlert } from 'src/app/app.component';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  closeResult = '';

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal, private laboratorioService: LaboratorioService) { }
  usuarios: UsuarioModel[] = [];
  laboratorios: LaboratorioModel[] = [];
  usuario: UsuarioModel = new UsuarioModel;
  usuarioUpdate: UsuarioModel = new UsuarioModel;
  usuarioRemove: UsuarioModel = new UsuarioModel;


  ngOnInit() {
    this.findAll();
    this.laboratorioService.findAll().subscribe(
      response => {
        this.laboratorios = response;
        console.log(response);
      },
      error => {
        showErrorAlert('Se produjo un error consultando los laboratorios.');
      });
  }
  findAll() {
    this.usuarioService.findAll().subscribe(
      response => {
        this.usuarios = response;
        console.log(response);
      },
      error => {
        showErrorAlert('Se produjo un error consultando los coordinadores.');
      })
  }
  save(form: NgForm) {
    if (form.valid) {
      this.usuarioService.save(this.usuario).subscribe(
        response => {
          console.log(response);
          this.findAll();
          this.usuario = new UsuarioModel;
        },
        error => {
          showErrorAlert('Se produjo un error creando los el usuario.');
        });
    } else {
      alert("Formulario no válido.")
    }
  }
  viewUpdate(modal, id: number) {
    const dataUpdate = Object.assign({}, this.usuarios[id]);
    this.usuarioUpdate = dataUpdate;
    console.log(this.usuarioUpdate);

    this.modalService.open(modal);
  }
  update(form: NgForm) {
    if (form.valid) {
      this.usuarioService.update(this.usuarioUpdate).subscribe(
        response => {
          console.log(response);
          this.usuarioUpdate = new UsuarioModel;
          this.findAll();
          this.modalService.dismissAll();
        },
        error => {
          showErrorAlert('Se produjo un error modificando el usuario.');
        });
    } else {
      alert("Formulario no válido.");
    }
  }
  modalDelete(modal, user: UsuarioModel) {
    this.usuarioRemove = user;
    console.log(this.usuarioRemove);
    this.modalService.open(modal, { size: 'sm' });
  }
  delete() {
    this.usuarioService.delete(this.usuarioRemove).subscribe(
      response => {
        console.log(response);
        this.usuarioRemove = new UsuarioModel;
        this.findAll();
        this.modalService.dismissAll();
      },
      error => {
        showErrorAlert('Se produjo un error eliminando este usuario.');
      });
  }

}
