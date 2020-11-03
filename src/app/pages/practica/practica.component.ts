import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { showErrorAlert } from 'src/app/app.component';
import { CalendarioPracticaModel } from 'src/app/models/calendarioPractica.model';
import { LaboratorioModel } from 'src/app/models/laboratorio.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoPracticaModel } from 'src/app/models/productoPractica.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { CalentadrioPracticaService } from 'src/app/service/calendarioPractica/calentadrio-practica.service';
import { LaboratorioService } from 'src/app/service/laboratorio/laboratorio.service';
import { ProductService } from 'src/app/service/product/product.service';
import { ProductoPracticaService } from 'src/app/service/productoPractica/producto-practica.service';
import { UsuarioService } from 'src/app/service/usuarios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-practica',
  templateUrl: './practica.component.html',
  styleUrls: ['./practica.component.css']
})
export class PracticaComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;

  calendarioPractica: CalendarioPracticaModel = new CalendarioPracticaModel;
  coordinadores: UsuarioModel[] = [];
  laboratorios: LaboratorioModel[] = [];
  productos: ProductoModel[] = [];
  practicaSeleccionada = new CalendarioPracticaModel;
  productosUtilizarPractica: ProductoPracticaModel[] = [];
  constructor(private modal: NgbModal, private usuarioService: UsuarioService, private laboratorioService: LaboratorioService, private productService: ProductService, 
    private calendarioPracticaService: CalentadrioPracticaService,private productoPracticaService:ProductoPracticaService) { }
  ngOnInit() {
    this.usuarioService.findAll().subscribe(
      response => {
        this.coordinadores = response;
      },
      error => {
        showErrorAlert('Se produjo un error consultando los coordinadores.');
      }
    );
    this.laboratorioService.findAll().subscribe(
      response => {
        this.laboratorios = response;
      },
      error => {
        showErrorAlert('Se produjo un error consultando los laboratorios.');
      });
    this.productService.findAll().subscribe(
      response => {
        this.productos = response;
      },
      error => {
        showErrorAlert('Se produjo un error consultando los productos.');
      });
    this.allEvents();
  }
  allEvents() {
    this.calendarioPracticaService.findAll().subscribe(
      response => {
        this.modal.dismissAll();
        let allEvents: CalendarioPracticaModel[] = response;
        console.log(allEvents);
        this.events = [];
        allEvents.forEach(event => {
          this.events = [
            ...this.events,
            {
              meta: { "id": event.idCalendario },
              title: 'Practica Agendada',
              start: new Date(event.fechaPractica + " " + event.horaInicio),
              end: new Date(event.fechaPractica + " " + event.horaFin),
              color: {
                primary: '#1e90ff',
                secondary: '#D1E8FF',
              },
              draggable: false,
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
            }]
        });
      },
      error => {
        showErrorAlert('Se produjo un error consultando los productos.');
      });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  openDetails(event: CalendarEvent): void {
    console.log(event);
    this.practicaSeleccionada.idCalendario = parseInt(event.meta.id);
    this.calendarioPracticaService.findBy(this.practicaSeleccionada).subscribe(
      response => {
        let responseParse: any = response;
        this.practicaSeleccionada = responseParse;
        console.log(this.practicaSeleccionada);
      },
      error => {
        showErrorAlert('Se produjo un error consultando los detalles de la practica.');
      });
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  modalAddEvent(modal) {
    this.modal.open(modal, { size: 'lg' });
  }

  addEvent(form: NgForm): void {
    if (form.valid) {
      this.calendarioPracticaService.save(this.calendarioPractica).subscribe(
        response => {
          this.modal.dismissAll();
          let responseObj:any = response;
          this.calendarioPractica = responseObj;
          this.guardarProductosPractica();
          this.allEvents();
        },
        error => {
          showErrorAlert('Se produjo un error consultando los productos.');
        });
    } else {
      showErrorAlert('Por favor completa el formulario.');
    }

  }
  guardarProductosPractica(){
    this.productosUtilizarPractica.forEach(product=>{
      product.idCalendarioFk.idCalendario = this.calendarioPractica.idCalendario;
      this.productoPracticaService.save(product).subscribe(
        response => {
          console.log("Prductos registrados en la practica");
          console.log(response);
        },
        error => {
          showErrorAlert('Se produjo un error guardando los productos que se utilizaran en la practica.');
          return ;
        });
    });
    
  }
  deleteEvent() {
    this.calendarioPracticaService.delete(this.practicaSeleccionada).subscribe(
      response => {
        this.allEvents();
      },
      error => {
        showErrorAlert('Se produjo un error eliminado la practica.');
      });
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  utilizarProducto(product: ProductoModel) {
    document.getElementById("element" + product.idProducto).classList.add("hidden");
    document.getElementById("elementDelete" + product.idProducto).classList.remove("hidden");
    let addProduct = new ProductoPracticaModel;
    //addProduct.idCalendarioFk.idCalendario = this.calendarioPractica.idCalendario;
    addProduct.idProductoFk.idProducto = product.idProducto;
    this.productosUtilizarPractica.push(addProduct);
    console.log(this.productosUtilizarPractica);
    return false;
  }

  eliminarProducto(product: ProductoModel) {
    document.getElementById("elementDelete" + product.idProducto).classList.add("hidden");
    document.getElementById("element" + product.idProducto).classList.remove("hidden");
    this.productosUtilizarPractica = this.removeItemFromArr(this.productosUtilizarPractica, product);
    console.log(this.productosUtilizarPractica);
    return false;
  }

  removeItemFromArr(arr, item) {
    return arr.filter(function (e) {
      return e !== item;
    });
  };
}
