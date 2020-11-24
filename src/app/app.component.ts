import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'polilab';
}
export function showErrorAlert(message: string, reload: boolean = false) {
  if (reload) {
    Swal.fire({
      title: 'Lo sentimos!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      preConfirm: () => {
        location.reload()
      }
    })
  } else {
    Swal.fire({
      title: 'Lo sentimos!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }
}
