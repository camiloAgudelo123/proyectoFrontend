import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { showErrorAlert } from 'src/app/app.component';
import { LaboratorioModel } from 'src/app/models/laboratorio.model';
import { PracticaModel } from 'src/app/models/practica.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { LaboratorioService } from 'src/app/service/laboratorio/laboratorio.service';
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
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    { 
      meta:{
        id:1
      },
      start: new Date(),
      end: new Date(),
      title: 'A 3 day event',
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF',
      },
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];

  activeDayIsOpen: boolean = true;
  practica:PracticaModel = new PracticaModel;
  coordinadores: UsuarioModel[] = [];
  laboratorios: LaboratorioModel[] = [];
  idPracticaSeleccionada:number;
  constructor(private modal: NgbModal,private usuarioService:UsuarioService,private laboratorioService:LaboratorioService) {}
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

  eventTimesChanged({event, newStart,newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(action);
    console.log(event);
    this.idPracticaSeleccionada = parseInt(event.meta.id);
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  modalAddEvent(modal){
    this.modal.open(modal);
  }
  addEvent(form:NgForm): void {
    console.log();
    this.modal.dismissAll();
    this.events = [
      ...this.events,
      {
        meta:{"id":1},
        title: 'Practica',
        start: new Date(this.practica.fechaPractica +" "+this.practica.horaInicio),
        end: new Date(this.practica.fechaPractica +" "+this.practica.horaFin),
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF',
        },
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(deleteEvent) {
    console.log(this.idPracticaSeleccionada);
  }




  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  
}
