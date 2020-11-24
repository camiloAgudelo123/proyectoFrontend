import { Component, OnInit } from '@angular/core';
import { showErrorAlert } from 'src/app/app.component';
import { PdfService } from 'src/app/service/pdf/pdf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  constructor(private pdfService: PdfService) { }

  ngOnInit(): void {
  }
  generarTarjetaEmergencia() {
    this.pdfService.generateBase64().subscribe(
      response => {
        console.log(response);
        let pdf: any = response;
        this.generarPdf(pdf.base64, "Tajeta emergencia");
      },
      error => {
        showErrorAlert('Se produjo un error generando el pdf.');
      }
    );
  }
  generarEtiqueta() {
    this.pdfService.generateBase64().subscribe(
      response => {
        console.log(response);
        let pdf: any = response;
        this.generarPdf(pdf.base64, "Tajeta Etiqueta");
      },
      error => {
        showErrorAlert('Se produjo un error generando el pdf.');
      }
    );
  }
  generarEtiquetaGotero() {
    this.pdfService.generateBase64().subscribe(
      response => {
        console.log(response);
        let pdf: any = response;
        this.generarPdf(pdf.base64, "Tajeta Etiqueta Gotero");
      },
      error => {
        showErrorAlert('Se produjo un error generando el pdf.');
      }
    );
  }

  generarPdf(base64: string, nombreArchivo: string) {
    const linkSource = 'data:application/pdf;base64,' + base64;
    const downloadLink = document.createElement("a");
    const fileName = nombreArchivo + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
