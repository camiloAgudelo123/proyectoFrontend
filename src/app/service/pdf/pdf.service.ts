import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private url = "http://localhost:5000/pdf/generar";
  constructor(private http:HttpClient) { }
  
  generateBase64(){
    return this.http.get(`${this.url}`);
  }
}
